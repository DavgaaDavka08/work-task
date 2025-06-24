import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendResetPasswordEmail } from "@/lib/mailer";

export const POST = async (req: Request) => {
  const { email } = await req.json();
  const token = crypto.randomUUID();

  const result = await runQuery(
    `UPDATE users SET reset_token = $1 WHERE email = $2 RETURNING *`,
    [token, email]
  );

  if (result.length === 0) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  await sendResetPasswordEmail(email, token);

  return NextResponse.json({ message: "Reset email sent successfully." });
};
