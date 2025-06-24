import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { token, newPassword } = await req.json();

  const hashed = await bcrypt.hash(newPassword, 10);

  const result = await runQuery(
    `UPDATE users SET password = $1, reset_token = NULL WHERE reset_token = $2 RETURNING *`,
    [hashed, token]
  );

  if (result.length === 0) {
    return NextResponse.json(
      { message: "Invalid or expired token." },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Password has been reset." });
};
