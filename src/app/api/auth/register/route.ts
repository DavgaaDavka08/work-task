import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { applyRateLimit } from "@/lib/rate-limit";
import { sendVerificationEmail } from "@/lib/mailer";

export const POST = async (req: Request) => {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!(await applyRateLimit(ip))) {
      return NextResponse.json(
        { message: "Too many requests" },
        { status: 429 }
      );
    }

    const { name, email, password, role } = await req.json();
    const allowedRoles = ["reader", "editor", "admin"];
    const userRole = allowedRoles.includes(role) ? role : "reader";

    const existing = await runQuery(`SELECT id FROM users WHERE email = $1`, [
      email,
    ]);
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomUUID();

    await runQuery(
      `INSERT INTO users (name, email, password, role, verification_token, is_verified)
       VALUES ($1, $2, $3, $4, $5, false)`,
      [name, email, hashedPassword, userRole, token]
    );

    await sendVerificationEmail(email, token);

    return NextResponse.json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
};
