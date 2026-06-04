"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { getResendClient, RESEND_FROM } from "@/lib/resend";
import { ADMIN_COOKIE, isAuthenticated } from "@/lib/admin-auth";
import { nameFromEmail } from "@/lib/name-from-email";

function personalize(template: string, email: string): string {
  const name = nameFromEmail(email);
  return template
    .replaceAll("{{name}}", name)
    .replaceAll("{{email}}", email);
}

async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function deleteSignupAction(id: string) {
  await requireAuth();
  if (!id) return { error: "Missing id" };
  const { error } = await supabase.from("waitlist").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

const BATCH = 100; // Resend batch.send max
const DELAY_MS = 1100; // stay under 2 req/sec Resend rate limit

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function sendBroadcastAction(formData: FormData) {
  await requireAuth();
  const subject = String(formData.get("subject") ?? "").trim();
  const html = String(formData.get("html") ?? "").trim();

  if (!subject || !html) {
    return { error: "Subject and body are required." };
  }

  const resend = getResendClient();
  if (!resend) {
    return { error: "Missing RESEND_API_KEY." };
  }

  // Pull every subscriber
  const { data: subs, error: subsErr } = await supabase
    .from("waitlist")
    .select("email");
  if (subsErr) return { error: subsErr.message };
  const emails = (subs ?? []).map((s) => s.email).filter(Boolean);
  if (emails.length === 0) {
    return { error: "No subscribers to send to." };
  }

  let sent = 0;
  let failures = 0;
  for (const batch of chunk(emails, BATCH)) {
    try {
      const payload = batch.map((to) => ({
        from: RESEND_FROM,
        to,
        subject: personalize(subject, to),
        html: personalize(html, to),
      }));
      const { data, error } = await resend.batch.send(payload);
      if (error) {
        failures += batch.length;
        console.error("Resend batch error:", error);
      } else {
        sent += data?.data?.length ?? batch.length;
      }
    } catch (e) {
      failures += batch.length;
      console.error("Resend batch threw:", e);
    }
    if (batch.length === BATCH) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  // Log the broadcast even if some sends failed
  await supabase
    .from("broadcasts")
    .insert({ subject, html, recipient_count: sent });

  revalidatePath("/admin");
  return { ok: true, sent, failures, total: emails.length };
}
