import { applyRateLimit } from "@/lib/rate-limit";
import { runQuery } from "@/server/queryService";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/types/article";
export const POST = async (req: Request) => {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!(await applyRateLimit(ip))) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  const { email, password } = await req.json();
  const result = await runQuery<User>(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.length === 0) {
    return NextResponse.json(
      { message: "Invalid credentials." },
      { status: 401 }
    );
  }

  const user = result[0];
  if (!user.is_verified) {
    return NextResponse.json(
      { message: "Email not verified." },
      { status: 403 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { message: "Incorrect password." },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
  return NextResponse.json({ message: "Login successful", token });
};
