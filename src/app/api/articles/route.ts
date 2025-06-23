import { runQuery } from "@/server/queryService";

export const POST = async (req: Request) => {
  const { title, content, tags, author_id, image } = await req.json();

  if (!title || !content || !tags || !image) {
    return new Response("All fields are required", { status: 400 });
  }

  const result = await runQuery(
    `INSERT INTO article (title, content, tags, author_id, is_published, image)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, content, tags, author_id, true, image]
  );

  return Response.json({ article: result[0] });
};

export const GET = async () => {
  const articles = await runQuery(
    `SELECT * FROM article WHERE is_published = true ORDER BY created_at DESC`
  );

  return Response.json({ articles });
};

export const PUT = async (req: Request) => {
  const { title, content, tags, is_published, id, image } = await req.json();

  if (!id || !title || !content || !tags || !image) {
    return new Response("Missing required fields", { status: 400 });
  }

  const result = await runQuery(
    `UPDATE article
     SET title = $1,
         content = $2,
         tags = $3,
         is_published = $4,
         image = $5,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6
     RETURNING *`,
    [
      title,
      content,
      tags,
      is_published === true || is_published === "true",
      image,
      id,
    ]
  );

  return Response.json({ article: result[0] });
};
