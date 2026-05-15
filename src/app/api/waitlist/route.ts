import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { getWelcomeEmailHtml } from "@/lib/email-template";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "You're already on the list" },
        { status: 409 },
      );
    }

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email, source: "landing_page" });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong. Try again." },
        { status: 500 },
      );
    }

    try {
      await resend.emails.send({
        from: "FTHUN <noreply@fthun.com>",
        to: email,
        subject: "You're In — Early Access Confirmed",
        html: getWelcomeEmailHtml(email),
      });
    } catch (emailError) {
      console.error("Resend email error:", emailError);
    }

    return NextResponse.json({ message: "You're on the list" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 },
    );
  }
}
