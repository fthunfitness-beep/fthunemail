import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { getResendClient, RESEND_FROM } from "@/lib/resend";
import {
  getWelcomeEmailHtml,
  getWelcomeEmailText,
} from "@/lib/email-template";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error("Waitlist config error: missing Supabase config");
      return NextResponse.json(
        {
          error: "Something went wrong. Try again.",
          code: "supabase_config_missing",
        },
        { status: 500 },
      );
    }

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email, source: "landing_page" });

    let wasAlreadyListed = false;
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      if (insertError.code === "23505") {
        wasAlreadyListed = true;
      } else {
        return NextResponse.json(
          {
            error: "Something went wrong. Try again.",
            code: `supabase_insert_${insertError.code ?? "unknown"}`,
          },
          { status: 500 },
        );
      }
    }

    const resend = getResendClient();
    if (!resend) {
      console.error("Resend config error: missing RESEND_API_KEY");
      return NextResponse.json({
        message: "You're on the list. Confirmation email is delayed.",
        emailStatus: "skipped",
      });
    }

    const { error: emailError } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "You kept showing up",
      html: getWelcomeEmailHtml(email),
      text: getWelcomeEmailText(email),
    });

    if (emailError) {
      console.error("Resend email error:", {
        message: emailError.message,
        name: emailError.name,
        from: RESEND_FROM,
      });
      return NextResponse.json({
        message: "You're on the list. Confirmation email is delayed.",
        emailStatus: "failed",
      });
    }

    return NextResponse.json({
      message: wasAlreadyListed
        ? "You're already on the list. Check your inbox for confirmation."
        : "You're on the list. Check your inbox for confirmation.",
      emailStatus: "sent",
    });
  } catch (error) {
    console.error("Waitlist route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 },
    );
  }
}
