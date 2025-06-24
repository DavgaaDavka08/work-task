import { runQuery } from "@/server/queryService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 400 });
  }

  const result = await runQuery(
    `UPDATE users SET is_verified = true, verification_token = NULL WHERE verification_token = $1 RETURNING *`,
    [token]
  );

  if (result.length === 0) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Email verified successfully." });
};
