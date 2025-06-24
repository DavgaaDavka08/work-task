// /app/api/auth/reset-password/route.ts
import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendResetPasswordEmail } from "@/lib/mailer";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  const users = await runQuery<{ id: number }>(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );

  if (users.length === 0) {
    return NextResponse.json(
      { message: "If this email exists, a reset link has been sent." },
      { status: 200 }
    );
  }

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 цаг

  await runQuery(
    `UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3`,
    [token, expires, email]
  );

  await sendResetPasswordEmail(email, token);

  return NextResponse.json({ message: "Reset link sent to your email." });
};
