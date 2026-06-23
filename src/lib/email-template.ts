import { nameFromEmail } from "./name-from-email";
import { getLaunchDate } from "./launch";

const INSTAGRAM_URL = "https://instagram.com/fthunofficial";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function daysUntilDrop(): number | null {
  const drop = getLaunchDate().getTime();
  const diff = drop - Date.now();
  return diff > 0 ? Math.floor(diff / (24 * 60 * 60 * 1000)) : null;
}

export function getWelcomeEmailHtml(email: string): string {
  const days = daysUntilDrop();
  const dropLine = days
    ? `Drop one opens in <strong style="color:#FFFFFF;">${days} days</strong>.`
    : "The first drop is coming.";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fthun.xyz";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FTHUN</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;color:#FFFFFF;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;">
    <tr>
      <td align="center" style="padding:56px 20px;">
        <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background-color:#0E0E0E;border:1px solid #252525;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:38px 36px 24px;">
              <span style="font-size:18px;font-weight:800;letter-spacing:0.24em;color:#FFFFFF;">
                FTHUN
              </span>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 36px 34px;">
              <div style="height:2px;background-color:#E63946;"></div>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding:0 32px 18px;">
              <h1 style="margin:0;font-size:34px;font-weight:700;line-height:1.08;letter-spacing:-0.02em;color:#FFFFFF;font-family:'Helvetica Neue',Arial,sans-serif;">
                Do not stop halfway.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td align="center" style="padding:0 36px 20px;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#C9C9C9;max-width:410px;">
                You are on the early list for Collection 01.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 36px 36px;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#A8A8A8;max-width:410px;">
                FTHUN is for the days that test you: the missed starts, the ugly reps, the last set you finish anyway.
                <br/><br/>
                ${dropLine} Until then, stay close.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:0 36px 40px;">
              <a href="${INSTAGRAM_URL}"
                style="display:inline-block;padding:14px 34px;background-color:#FFFFFF;color:#050505;font-size:11px;font-weight:800;letter-spacing:0.13em;text-transform:uppercase;text-decoration:none;">
                Follow @fthunofficial
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 36px 28px;">
              <div style="height:1px;background-color:#252525;"></div>
            </td>
          </tr>

          <!-- Sign off -->
          <tr>
            <td align="center" style="padding:0 36px 28px;">
              <p style="margin:0;font-size:13px;line-height:1.7;color:#9B9B9B;">
                Finish what you started.<br/>
                <span style="color:#FFFFFF;font-weight:700;">- FTHUN</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:0 36px 36px;">
              <p style="margin:0;font-size:11px;line-height:1.6;color:#696969;">
                You're receiving this because you signed up at
                <a href="${escapeHtml(siteUrl)}" style="color:#FFFFFF;text-decoration:underline;text-decoration-color:#E63946;">fthun.xyz</a>.
                <br/>
                &copy; ${new Date().getFullYear()} FTHUN. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

export function getWelcomeEmailText(email: string): string {
  const name = nameFromEmail(email);
  const days = daysUntilDrop();
  const dropLine = days
    ? `Drop one opens in ${days} days.`
    : "The first drop is coming.";

  return [
    `Hey ${name},`,
    "",
    "Do not stop halfway.",
    "",
    "You are on the early list for Collection 01.",
    "",
    "FTHUN is for the days that test you: the missed starts, the ugly reps, the last set you finish anyway.",
    "",
    `${dropLine} Until then, stay close.`,
    "",
    "Follow @fthunofficial:",
    INSTAGRAM_URL,
    "",
    "Finish what you started.",
    "- FTHUN",
  ].join("\n");
}
