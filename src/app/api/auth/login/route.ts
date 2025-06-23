import { runQuery } from "@/server/queryService";
import { User } from "@/types/article";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Enter email, password" },
        { status: 400 }
      );
    }
    const getUsersQuery = `SELECT * FROM "users" WHERE email = $1`;
    const userQuery = await runQuery(getUsersQuery, [email]);

    if (userQuery.length === 0) {
      return NextResponse.json({ error: "users resgister" }, { status: 404 });
    }

    const user = userQuery[0] as User;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "correct password" }, { status: 401 });
    }

    return NextResponse.json({ user, message: "sucsses" }, { status: 200 });
  } catch (error) {
    console.error("signin error: ", error);
    return NextResponse.json({ error: "error in login" }, { status: 500 });
  }
};
