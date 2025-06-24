import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { message: "Incorrect password." },
      { status: 401 }
    );
  }
  return NextResponse.json(
    { message: "Login successful", user: { id: user.id, email: user.email } },
    { status: 200 }
  );
};
