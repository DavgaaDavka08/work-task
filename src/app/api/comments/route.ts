// # POST comment
import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/server/queryService";

export const POST = async (req: NextRequest) => {
  const { article_id, user_id, content } = await req.json();

  const newComment = await runQuery(
    `INSERT INTO comments (article_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`,
    [article_id, user_id, content]
  );

  return NextResponse.json({ comment: newComment[0] });
};
