import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
// import { sendVerificationEmail } from "@/lib/mailer"; // нэмэлтээр ашиглаж болно

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    const existing = await runQuery<{ id: number }>(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomUUID();

    await runQuery(
      `INSERT INTO users (name, email, password, role, verification_token) VALUES ($1, $2, $3, 'reader', $4)`,
      [name, email, hashedPassword, token]
    );

    // ✉️ Email илгээх (дараа хэрэгжүүлнэ)
    // await sendVerificationEmail(email, token);

    return NextResponse.json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong during registration." },
      { status: 500 }
    );
  }
};
