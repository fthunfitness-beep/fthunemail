import { nameFromEmail } from "./name-from-email";

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
  const iso = process.env.NEXT_PUBLIC_DROP_DATE;
  if (!iso) return null;
  const drop = new Date(iso).getTime();
  if (Number.isNaN(drop)) return null;
  const diff = drop - Date.now();
  return diff > 0 ? Math.ceil(diff / (24 * 60 * 60 * 1000)) : null;
}

export function getWelcomeEmailHtml(email: string): string {
  const days = daysUntilDrop();
  const dropLine = days
    ? `The first drop is <strong style="color:#151515;">${days} days</strong> out.`
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
<body style="margin:0;padding:0;background-color:#F3F1EC;color:#151515;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F1EC;">
    <tr>
      <td align="center" style="padding:56px 20px;">
        <table role="presentation" width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background-color:#FBFAF7;border:1px solid #DDD8CF;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:40px 36px 28px;">
              <span style="font-size:18px;font-weight:700;letter-spacing:0.22em;color:#151515;">
                FTHUN
              </span>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 36px 36px;">
              <div style="height:1px;background-color:#D94A38;"></div>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding:0 36px 18px;">
              <h1 style="margin:0;font-size:32px;font-weight:500;line-height:1.12;letter-spacing:-0.02em;color:#151515;font-family:Georgia,'Times New Roman',serif;">
                You kept showing up.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td align="center" style="padding:0 36px 22px;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#47433D;max-width:410px;">
                You're on the early list for FTHUN - built for the ones who do not quit when the room gets quiet.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 36px 36px;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#47433D;max-width:410px;">
                The missed reps. The restarts. The last set you had no reason to finish, but did anyway. That is the standard.
                <br/><br/>
                ${dropLine} Until then, stay close to the build.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:0 36px 40px;">
              <a href="${INSTAGRAM_URL}"
                style="display:inline-block;padding:14px 34px;background-color:#151515;color:#FBFAF7;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;text-decoration:none;">
                Follow the build
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 36px 28px;">
              <div style="height:1px;background-color:#DDD8CF;"></div>
            </td>
          </tr>

          <!-- Sign off -->
          <tr>
            <td align="center" style="padding:0 36px 28px;">
              <p style="margin:0;font-size:13px;line-height:1.7;color:#5F5A52;">
                Keep showing up.<br/>
                <span style="color:#151515;font-weight:600;">- FTHUN</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:0 36px 36px;">
              <p style="margin:0;font-size:11px;line-height:1.6;color:#8A8378;">
                You're receiving this because you signed up at
                <a href="${escapeHtml(siteUrl)}" style="color:#151515;text-decoration:underline;text-decoration-color:#D94A38;">fthun.xyz</a>.
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
    ? `The first drop is ${days} days out.`
    : "The first drop is coming.";

  return [
    `Hey ${name},`,
    "",
    "You kept showing up.",
    "",
    "You're on the early list for FTHUN - built for the ones who do not quit when the room gets quiet.",
    "",
    "The missed reps. The restarts. The last set you had no reason to finish, but did anyway. That is the standard.",
    "",
    `${dropLine} Until then, stay close to the build.`,
    "",
    "Follow the build:",
    INSTAGRAM_URL,
    "",
    "Keep showing up.",
    "- FTHUN",
  ].join("\n");
}
