import { runQuery } from "@/server/queryService";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  const result = await runQuery(
    `UPDATE users SET is_verified = true, verification_token = NULL WHERE verification_token = $1 RETURNING id`,
    [token]
  );

  if (result.length === 0) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Email successfully verified!" });
};
