import { transporter } from "./mailer";

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Task News" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email",
    html: `
      <p>Сайн байна уу,</p>
      <p>Бүртгэлээ баталгаажуулахын тулд доорх холбоос дээр дарна уу:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>Хэрвээ та энэ хүсэлтийг явуулаагүй бол үл тоомсорлоорой.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
