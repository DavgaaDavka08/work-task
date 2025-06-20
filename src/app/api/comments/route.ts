// # POST comment
import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/server/queryService";

export const POST = async (req: NextRequest) => {
  try {
    const { article_id, user_id, content } = await req.json();

    if (!article_id || !user_id || !content) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const newComment = await runQuery(
      `INSERT INTO comments (article_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, user_id, content]
    );

    return NextResponse.json({ comment: newComment[0] });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
