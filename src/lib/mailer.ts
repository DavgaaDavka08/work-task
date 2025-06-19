import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendResetEmail = async (to: string, token: string) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Task News" <${EMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <p>Сайн байна уу,</p>
      <p>Нууц үг сэргээх хүсэлт хүлээн авлаа. Доорх холбоос дээр дарж шинэ нууц үг үүсгээрэй:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Хэрвээ та энэ хүсэлтийг явуулаагүй бол үл тоомсорлоорой.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
