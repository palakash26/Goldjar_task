import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  if (!process.env.SMTP_HOST) {
    console.warn("No SMTP configured — skipping sendEmail");
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html
  });
}
