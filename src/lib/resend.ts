import { Resend } from "resend";

export const RESEND_FROM =
  process.env.RESEND_FROM || "FTHUN <noreply@fthun.xyz>";

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
}
