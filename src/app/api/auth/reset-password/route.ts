import { NextResponse } from "next/server";
import crypto from "crypto";
import { runQuery } from "@/server/queryService";
import { User } from "@/types/article";
import { sendResetEmail } from "@/lib/mailer";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const userQuery = (await runQuery(
      `SELECT * FROM "users" WHERE email = $1`,
      [email]
    )) as User[];

    if (userQuery.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60);

    await runQuery(
      `INSERT INTO "password_reset_tokens" (user_id, token, expires_at) VALUES ($1, $2, $3)`,
      [userQuery[0].id, token, expires]
    );

    await sendResetEmail(email, token);

    return NextResponse.json({ message: "Reset email sent" });
  } catch (error) {
    console.error("Reset email error", error);
    return NextResponse.json({ error: "Email send error" }, { status: 500 });
  }
};
