export function getWelcomeEmailHtml(email: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're In</title>
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
                You're In
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#A1A1AA;max-width:380px;">
                Early access confirmed for <strong style="color:#FAFAFA;">${email}</strong>.
                You'll be first to know when Collection 01 drops. No spam. Just the drop.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom:48px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://fthun.com"}"
                style="display:inline-block;padding:14px 36px;background-color:#FAFAFA;color:#09090B;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;">
                Visit FTHUN
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="height:1px;background-color:#27272A;"></div>
            </td>
          </tr>

          <!-- Social -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#71717A;">
                Follow the journey
              </span>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <a href="#" style="color:#71717A;font-size:12px;text-decoration:none;margin:0 12px;">Instagram</a>
              <a href="#" style="color:#71717A;font-size:12px;text-decoration:none;margin:0 12px;">TikTok</a>
              <a href="#" style="color:#71717A;font-size:12px;text-decoration:none;margin:0 12px;">Twitter</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center">
              <p style="margin:0;font-size:11px;color:#3F3F46;">
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
