import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getResendClient, RESEND_FROM } from "@/lib/resend";
import { getWelcomeEmailHtml } from "@/lib/email-template";

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

    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email, source: "landing_page" });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the list" },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: "Something went wrong. Try again." },
        { status: 500 },
      );
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
      subject: "You're In - Early Access Confirmed",
      html: getWelcomeEmailHtml(email),
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
      message: "You're on the list. Check your inbox for confirmation.",
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
