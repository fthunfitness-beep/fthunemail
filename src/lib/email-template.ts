import { nameFromEmail } from "./name-from-email";

const INSTAGRAM_URL = "https://instagram.com/fthunofficial";

function daysUntilDrop(): number | null {
  const iso = process.env.NEXT_PUBLIC_DROP_DATE;
  if (!iso) return null;
  const drop = new Date(iso).getTime();
  if (Number.isNaN(drop)) return null;
  const diff = drop - Date.now();
  return diff > 0 ? Math.ceil(diff / (24 * 60 * 60 * 1000)) : null;
}

export function getWelcomeEmailHtml(email: string): string {
  const name = nameFromEmail(email);
  const days = daysUntilDrop();
  const dropLine = days
    ? `The first drop is <strong style="color:#FAFAFA;">${days} days</strong> out.`
    : "The first drop is coming.";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FTHUN</title>
</head>
<body style="margin:0;padding:0;background-color:#09090B;color:#FAFAFA;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090B;">
    <tr>
      <td align="center" style="padding:60px 20px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:48px;">
              <span style="font-size:20px;font-weight:500;letter-spacing:0.2em;color:#FAFAFA;">
                FTHUN
              </span>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:48px;">
              <div style="height:1px;background-color:#27272A;"></div>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <h1 style="margin:0;font-size:28px;font-weight:400;letter-spacing:-0.02em;color:#FAFAFA;font-family:Georgia,'Times New Roman',serif;">
                Hey ${name},
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#A1A1AA;max-width:380px;">
                Welcome to FTHUN. You're in early — part of a small group watching this come together from the inside.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#A1A1AA;max-width:380px;">
                ${dropLine} Until then, the build is happening on Instagram — fabric, fit sessions, prints, behind the scenes. Come watch it unfold.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom:48px;">
              <a href="${INSTAGRAM_URL}"
                style="display:inline-block;padding:14px 36px;background-color:#FAFAFA;color:#09090B;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;">
                Follow @fthunofficial
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="height:1px;background-color:#27272A;"></div>
            </td>
          </tr>

          <!-- Sign off -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="margin:0;font-size:12px;line-height:1.7;color:#71717A;">
                See you on the inside.<br/>
                <span style="color:#A1A1AA;">— FTHUN</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:11px;color:#3F3F46;">
                You're receiving this because you signed up at
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://fthun.xyz"}" style="color:#52525B;text-decoration:none;">fthun.xyz</a>.
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
    "Welcome to FTHUN. You're in early - part of a small group watching this come together from the inside.",
    "",
    `${dropLine} Until then, the build is happening on Instagram - fabric, fit sessions, prints, behind the scenes.`,
    "",
    "Follow @fthunofficial:",
    INSTAGRAM_URL,
    "",
    "See you on the inside.",
    "- FTHUN",
  ].join("\n");
}
