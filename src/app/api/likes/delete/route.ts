import { runQuery } from "@/server/queryService";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { article_id, user_id } = await req.json();

  try {
    await runQuery(`DELETE FROM likes WHERE article_id = $1 AND user_id = $2`, [
      article_id,
      user_id,
    ]);
    return NextResponse.json({ message: "Unliked" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "Error unliking" }, { status: 500 });
  }
};
