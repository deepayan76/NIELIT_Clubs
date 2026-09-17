/**
 * Application Approved Email Template
 * Sends student account activation details & temporary password.
 */
export function getApplicationApprovedTemplate({
  name,
  club,
  rollNumber,
  semester,
  email,
  temporaryPassword,
  loginUrl = 'http://localhost:5173/login'
}) {
  const studentName = name || 'Student';
  const clubName = club ? `${club} Club` : 'Technical Club';
  const roll = rollNumber || 'N/A';
  const sem = semester ? `${semester}${getOrdinal(semester)} Semester` : 'N/A';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NIELIT Tech Clubs — Application Approved</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; line-height: 1.6;">
  <!-- Preview Text -->
  <div style="display: none; font-size: 1px; color: #F8FAFC; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Your application to the NIELIT Tech Clubs has been approved! Here are your student account login credentials.
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
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #047857;">
                Application Approved ✓
              </h1>

              <p style="margin: 0 0 20px 0; font-size: 15px; color: #333333; line-height: 1.6;">
                Hi <strong>${escapeHtml(studentName)}</strong>, 🎉
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; color: #444444; line-height: 1.6;">
                We are pleased to inform you that your application to the <strong>NIELIT Tech Clubs</strong> has been approved by the club administration. Your student account is now active!
              </p>

              <!-- Application Details Card -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666666; letter-spacing: 0.08em; margin-bottom: 14px; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
                      Application Details
                    </div>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #666666; width: 40%;">Club</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #16364A;">${escapeHtml(clubName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #666666;">Roll Number</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #111111;">${escapeHtml(roll)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #666666;">Semester</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #111111;">${escapeHtml(sem)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #666666;">Account Status</td>
                        <td style="padding: 6px 0; font-size: 13px;">
                          <span style="display: inline-block; padding: 3px 10px; background-color: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0; border-radius: 999px; font-weight: 700; font-size: 12px; letter-spacing: 0.04em;">
                            ✓ ACTIVE
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Credentials Card -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #1E40AF; letter-spacing: 0.08em; margin-bottom: 14px; border-bottom: 1px solid #DBEAFE; padding-bottom: 8px;">
                      Student Login Credentials
                    </div>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #1E40AF; width: 40%;">Official Email</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #1E3A8A;">${escapeHtml(email)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 14px; color: #1E40AF;">Temporary Password</td>
                        <td style="padding: 6px 0; font-size: 15px; font-family: monospace; font-weight: 700; color: #1E3A8A; background-color: #DBEAFE; padding: 4px 8px; border-radius: 4px; display: inline-block;">${escapeHtml(temporaryPassword)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${escapeHtml(loginUrl)}" target="_blank" style="display: inline-block; padding: 12px 28px; background-color: #16364A; color: #FFFFFF; text-decoration: none; font-weight: 700; font-size: 15px; border-radius: 6px; letter-spacing: 0.02em;">
                      Access Student Portal →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px 0; font-size: 13px; color: #64748B; line-height: 1.5;">
                🔒 <em>For security purposes, please log in and change your password as soon as possible.</em>
              </p>

              <!-- Signoff -->
              <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 14px; color: #444444;">
                <p style="margin: 0 0 4px 0; font-weight: 700; color: #16364A;">Regards,</p>
                <p style="margin: 0 0 2px 0; font-weight: 600; color: #16364A;">NIELIT Tech Clubs</p>
                <p style="margin: 0; font-size: 12px; color: #666666;">National Institute of Electronics & Information Technology</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 36px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 12px; color: #94A3B8;">
              This is an automated administrative notification. Please do not reply directly to this email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function getOrdinal(n) {
  const num = parseInt(n, 10);
  if (isNaN(num)) return '';
  const s = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
