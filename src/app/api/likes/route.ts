// # POST like, DELETE unlike
import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/server/queryService";

export const POST = async (req: NextRequest) => {
  const { article_id, user_id } = await req.json();

  try {
    await runQuery(
      `INSERT INTO likes (article_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [article_id, user_id]
    );
    return NextResponse.json({ message: "Liked" });
  } catch (error) {
    console.log("errors", error);
    return NextResponse.json({ error: "Error liking" }, { status: 500 });
  }
};
