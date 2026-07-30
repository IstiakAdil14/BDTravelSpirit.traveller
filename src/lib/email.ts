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

export async function sendBookingConfirmationEmail(email: string, bookingRef: string, tourName: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "BD Travel Spirit - Booking Confirmed",
    text: `Your booking (${bookingRef}) for ${tourName} is confirmed!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Booking Confirmed!</h2>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
          <p style="font-size: 18px; color: #374151;">Your booking reference is:</p>
          <div style="font-size: 28px; font-weight: bold; color: #059669; letter-spacing: 2px;">
            ${bookingRef}
          </div>
        </div>
        <p>Thank you for booking <strong>${tourName}</strong> with BD Travel Spirit.</p>
        <p>You can view your booking details on your dashboard.</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
