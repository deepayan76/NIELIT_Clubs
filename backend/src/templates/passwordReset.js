/**
 * Password Reset Email Template
 * Sends single-use secure reset link via Resend.
 */
export function getPasswordResetTemplate({
  name,
  resetUrl,
  expiresInMinutes = 20
}) {
  const studentName = name || 'Student';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NIELIT Tech Clubs — Password Reset Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; line-height: 1.6;">
  <!-- Preview Text -->
  <div style="display: none; font-size: 1px; color: #F8FAFC; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Reset your NIELIT Tech Clubs student password. This single-use link expires in ${expiresInMinutes} minutes.
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(22, 54, 74, 0.05); overflow: hidden;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #16364A; padding: 32px 36px; text-align: left;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #6A89A7; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">
                      National Institute of Electronics & Information Technology
                    </div>
                    <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.03em;">
                      NIELIT TECH CLUBS
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <!-- Title -->
              <h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #16364A; letter-spacing: -0.01em;">
                Password Reset Request
              </h1>
              
              <!-- Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155;">
                Dear <strong>${studentName}</strong>,
              </p>

              <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                We received a request to reset the password for your NIELIT Tech Clubs student account. Click the button below to choose a new, secure password.
              </p>

              <!-- Action CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-size: 15px; font-weight: 700; padding: 14px 32px; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);">
                  Reset Your Password
                </a>
              </div>

              <!-- Security Details Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 13px; font-weight: 700; color: #1E293B; margin-bottom: 6px;">
                      🔒 Security Advisory
                    </div>
                    <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #64748B; line-height: 1.5;">
                      <li>This link is valid for <strong>${expiresInMinutes} minutes</strong> only.</li>
                      <li>This link can be used <strong>only once</strong>.</li>
                      <li>If you did not request this password reset, please disregard this email. Your password will remain unchanged.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Fallback Direct Link -->
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #94A3B8;">
                If the button above does not work, copy and paste this link into your web browser:
              </p>
              <p style="margin: 0 0 24px 0; font-size: 12px; color: #2563EB; word-break: break-all;">
                ${resetUrl}
              </p>

              <!-- Signoff -->
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #F1F5F9; font-size: 14px; color: #334155;">
                Best regards,<br>
                <strong>NIELIT Technical Clubs Administration</strong>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F1F5F9; padding: 20px 36px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0; font-size: 12px; color: #64748B;">
                © 2026 NIELIT Tech Clubs. Official Institutional Student Portal.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
