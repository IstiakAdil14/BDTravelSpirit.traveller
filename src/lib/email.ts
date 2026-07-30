import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "BD Travel Spirit - Verification Code",
    text: `Your verification code is: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Your Verification Code</h2>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
          <div style="font-size: 32px; font-weight: bold; color: #059669; letter-spacing: 4px;">
            ${code}
          </div>
        </div>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendBookingConfirmationEmail(
  email: string,
  bookingRef: string,
  tourName: string,
  details?: {
    totalParticipants?: number;
    totalPaid?: number | string;
    currency?: string;
  }
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.DOMAIN || 'https://bd-travel-spirit-traveller-q26s.vercel.app';
  const dashboardUrl = `${appUrl}/dashboard`;

  const participantsRow = details?.totalParticipants
    ? `<tr>
        <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Participants</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #111827;">${details.totalParticipants} ${details.totalParticipants === 1 ? 'person' : 'people'}</td>
      </tr>`
    : '';

  const priceRow = details?.totalPaid != null
    ? `<tr>
        <td style="padding: 10px 0; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb;">Total Paid</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #059669; font-size: 18px; border-top: 1px solid #e5e7eb;">${details.currency || '৳'}${Number(details.totalPaid).toLocaleString()}</td>
      </tr>`
    : '';

  const mailOptions = {
    from: `"BD Travel Spirit" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: email,
    subject: `✅ Booking Confirmed — ${tourName} | BD Travel Spirit`,
    text: `Your booking (${bookingRef}) for ${tourName} is confirmed! View your booking at: ${dashboardUrl}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f0fdf4; font-family: 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:580px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 36px 40px; text-align: center;">
              <p style="margin:0 0 8px; color: #a7f3d0; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">BD Travel Spirit</p>
              <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:700;">Booking Confirmed! 🎉</h1>
              <p style="margin: 12px 0 0; color: #d1fae5; font-size: 15px;">Your adventure is officially booked.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">

              <!-- Booking Reference Box -->
              <div style="background: #f0fdf4; border: 2px dashed #6ee7b7; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
                <p style="margin:0 0 6px; color:#6b7280; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Booking Reference</p>
                <p style="margin:0; font-size: 32px; font-weight: 800; color: #059669; letter-spacing: 4px;">${bookingRef}</p>
                <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">Keep this reference number safe</p>
              </div>

              <!-- Tour Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px;">
                    <p style="margin:0; font-size: 13px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Tour Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Tour Name</td>
                  <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #111827;">${tourName}</td>
                </tr>
                ${participantsRow}
                ${priceRow}
              </table>

              <!-- Status Badge -->
              <div style="text-align: center; margin-bottom: 28px;">
                <span style="display: inline-block; background: #dcfce7; color: #166534; font-size: 13px; font-weight: 700; padding: 8px 20px; border-radius: 100px;">
                  ✓ Payment Received
                </span>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #059669, #047857); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 36px; border-radius: 10px;">
                  View My Booking →
                </a>
              </div>

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.7;">
                Thank you for choosing BD Travel Spirit for your adventure. If you have any questions about your booking, please contact our support team. We can't wait to see you on the road!
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin:0; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} BD Travel Spirit. All rights reserved.<br>
                You received this email because you made a booking on our platform.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
