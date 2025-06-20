import { runQuery } from "@/server/queryService";

// DELETE /api/articles?id=123
export const DELETE = async (req: Request) => {
  const id = await req.json();

  await runQuery(`DELETE FROM articles WHERE id = $1`, [id]);

  return new Response("Article deleted", { status: 200 });
};
