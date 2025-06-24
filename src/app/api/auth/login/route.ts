import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/types/article";

export const POST = async (req: Request) => {
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
      { message: "Please verify your email first." },
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

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  const res = NextResponse.json({
    message: "Login successful",
    user: { id: user.id, role: user.role },
  });

  res.cookies.set("token", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 900,
  });
  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/auth/refresh-token",
    maxAge: 604800,
  });

  return res;
};
