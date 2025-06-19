import { runQuery } from "@/server/queryService";

export const POST = async (req: Request) => {
  const { title, content, tags, author_id } = await req.json();
  const result = await runQuery(`DELETE * FROM `, [
    title,
    content,
    tags,
    author_id,
  ]);
  console.log("", result);
};
