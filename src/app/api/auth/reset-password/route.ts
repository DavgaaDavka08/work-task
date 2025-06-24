import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";

import { sendResetPasswordEmail } from "@/lib/mailer";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  const user = await runQuery(`SELECT id FROM users WHERE email = $1`, [email]);
  if (user.length === 0) {
    return NextResponse.json({ message: "Email not found" }, { status: 404 });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  await runQuery(
    `UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3`,
    [code, expiresAt, email]
  );

  await sendResetPasswordEmail(email, code);

  return NextResponse.json({ message: "Reset code sent to your email." });
};
