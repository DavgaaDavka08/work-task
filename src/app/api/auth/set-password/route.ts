import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { email, code, newPassword } = await req.json();

  const users = await runQuery(
    `SELECT id FROM users WHERE email = $1 AND reset_token = $2 AND reset_token_expires > NOW()`,
    [email, code]
  );

  if (users.length === 0) {
    return NextResponse.json(
      { message: "Invalid or expired code" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await runQuery(
    `UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE email = $2`,
    [hashed, email]
  );

  return NextResponse.json({ message: "Password updated successfully." });
};
