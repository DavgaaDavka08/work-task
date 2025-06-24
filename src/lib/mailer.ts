import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"MyApp" <no-reply@myapp.com>',
    to: email,
    subject: "Verify your email",
    html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
  });
}

// ✅ Нэмэх ёстой хэсэг ↓↓↓
export async function sendResetPasswordEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"MyApp" <no-reply@myapp.com>',
    to: email,
    subject: "Reset your password",
    html: `<p>You requested to reset your password. Click <a href="${resetUrl}">here</a> to proceed.</p>`,
  });
}
