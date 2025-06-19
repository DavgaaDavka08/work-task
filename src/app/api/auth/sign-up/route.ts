import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { runQuery } from "@/server/queryService";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const exists = await runQuery(`SELECT * FROM "users" WHERE email = $1`, [
      email,
    ]);
    if (exists.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await runQuery(
      `INSERT INTO "users" (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );

    return NextResponse.json(
      { user: result[0], message: "User registered" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "Registration error" }, { status: 500 });
  }
};
