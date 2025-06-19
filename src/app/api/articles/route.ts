import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/server/queryService";

export const GET = async () => {
  const articles = await runQuery(
    `SELECT * FROM articles WHERE is_published = true ORDER BY created_at DESC`
  );
  return NextResponse.json({ articles });
};

export const POST = async (req: NextRequest) => {
  const { title, content, tags, author_id } = await req.json();
  const result = await runQuery(
    `INSERT INTO articles (title, content, tags, author_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, content, tags, author_id]
  );
  return NextResponse.json({ article: result[0] });
};
