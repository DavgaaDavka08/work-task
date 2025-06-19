import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { runQuery } from "@/server/queryService";
import { sendVerificationEmail } from "@/lib/verifyemail";
import { RegisteredUser } from "@/types/article";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const exists = await runQuery<{ id: number }>(
      `SELECT id FROM "users" WHERE email = $1`,
      [email]
    );
    if (exists.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and return ID + email
    const insertedUser = await runQuery<RegisteredUser>(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email`,
      [name, email, hashedPassword]
    );

    const userId = insertedUser[0].id;

    // Create verification token (valid for 24 hours)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await runQuery(
      `INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)`,
      [userId, token, expires]
    );

    // Send verification email
    await sendVerificationEmail(email, token);

    return NextResponse.json(
      { message: "User registered. Verification email sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration error" }, { status: 500 });
  }
};
