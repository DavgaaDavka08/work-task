import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { token, newPassword } = await req.json();

  const users = await runQuery<{ id: number }>(
    `SELECT id FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()`,
    [token]
  );

  if (users.length === 0) {
    return NextResponse.json(
      { message: "Invalid or expired token." },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await runQuery(
    `UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2`,
    [hashed, users[0].id]
  );

  return NextResponse.json({ message: "Password successfully updated." });
};
