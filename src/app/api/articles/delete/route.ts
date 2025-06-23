import { runQuery } from "@/server/queryService";

export const POST = async (req: Request) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response("ID is required", { status: 400 });
    }

    await runQuery(`DELETE FROM article WHERE id = $1`, [id]);

    return new Response("Article deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
