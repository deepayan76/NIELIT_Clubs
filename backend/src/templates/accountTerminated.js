/**
 * Account Terminated Email Template
 * Sends official notification regarding student account termination/deactivation.
 */
export function getAccountTerminatedTemplate({ name, club, rollNumber }) {
  const studentName = name || 'Student';
  const clubName = club ? `${club} Club` : 'Technical Club';
  const roll = rollNumber || 'N/A';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NIELIT Tech Clubs — Account Status Update</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111; line-height: 1.6;">
  <!-- Preview Text -->
  <div style="display: none; font-size: 1px; color: #F8FAFC; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Your NIELIT Tech Clubs account has been deactivated.
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
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #16364A;">
                Account Status Update
              </h1>

              <p style="margin: 0 0 20px 0; font-size: 15px; color: #333333; line-height: 1.6;">
                Hi <strong>${escapeHtml(studentName)}</strong>,
              </p>

              <p style="margin: 0 0 16px 0; font-size: 15px; color: #444444; line-height: 1.6;">
                Your NIELIT Tech Clubs account has been deactivated by the club administration.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; color: #444444; line-height: 1.6;">
                Your account is no longer active and you can no longer access the student dashboard.
              </p>

              <!-- Account Summary Card -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FEF2F2; border: 1px solid #FECACA; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 24px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #991B1B; letter-spacing: 0.08em; margin-bottom: 12px; border-bottom: 1px solid #FCA5A5; padding-bottom: 6px;">
                      Account Details
                    </div>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #7F1D1D; width: 40%;">Club Membership</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #991B1B;">${escapeHtml(clubName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #7F1D1D;">Roll Number</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 600; color: #991B1B;">${escapeHtml(roll)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #7F1D1D;">Current Status</td>
                        <td style="padding: 4px 0; font-size: 14px; font-weight: 700; color: #DC2626;">DEACTIVATED</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px 0; font-size: 14px; color: #444444; line-height: 1.6;">
                If you believe this was done in error or need further information, please contact the NIELIT Tech Clubs administration.
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
              This is an automated email. Please do not reply.
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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
