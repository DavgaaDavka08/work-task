import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { runQuery } from "@/server/queryService";
import { RegisteredUser } from "@/types/article";

export const POST = async (req: Request) => {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token болон шинэ нууц үг шаардлагатай" },
        { status: 400 }
      );
    }

    const tokenQuery = await runQuery<RegisteredUser>(
      `SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > NOW()`,
      [token]
    );

    if (tokenQuery.length === 0) {
      return NextResponse.json(
        { error: "Token хүчингүй эсвэл хугацаа дууссан" },
        { status: 400 }
      );
    }

    const userId = tokenQuery[0].user_id;

    // Нууц үг шинэчлэх
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await runQuery(`UPDATE users SET password = $1 WHERE id = $2`, [
      hashedPassword,
      userId,
    ]);

    // Токен устгах
    await runQuery(`DELETE FROM password_reset_tokens WHERE token = $1`, [
      token,
    ]);

    return NextResponse.json({ message: "Нууц үг шинэчлэгдлээ" });
  } catch (error) {
    console.error("Нууц үг солих алдаа:", error);
    return NextResponse.json({ error: "Системийн алдаа" }, { status: 500 });
  }
};
