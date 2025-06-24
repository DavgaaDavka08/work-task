import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const url = `${process.env.APP_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });
}

export async function sendResetPasswordEmail(to: string, code: string) {
  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Password Reset Code",
    html: `
      <p>You requested to reset your password.</p>
      <p>Your 6-digit code is: <strong style="font-size: 24px;">${code}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `,
  });
}
