// POST /api/articles
import { runQuery } from "@/server/queryService";

export const POST = async (req: Request) => {
  const { title, content, tags, author_id } = await req.json();

  const result = await runQuery(
    `INSERT INTO articles (title, content, tags, author_id, is_published)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, content, tags, author_id, true]
  );

  return Response.json({ article: result[0] });
};
// GET /api/articles
export const GET = async () => {
  const articles = await runQuery(
    `SELECT * FROM articles WHERE is_published = true ORDER BY created_at DESC`
  );

  return Response.json({ articles });
};
// PUT /api/articles?id=123
export const PUT = async (req: Request) => {
  const { title, content, tags, is_published, id } = await req.json();

  const result = await runQuery(
    `UPDATE articles
     SET title = $1,
         content = $2,
         tags = $3,
         is_published = $4,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [title, content, tags, is_published === "true" ? true : false, id]
  );

  return Response.json({ article: result[0] });
};
