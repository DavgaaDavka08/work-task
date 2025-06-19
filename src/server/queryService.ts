/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "pg";
import { getClient } from "./connectDb";

export async function runQuery<T>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  const client: Client = getClient();
  try {
    await client.connect();
    const res = await client.query(query, params);
    return res.rows;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  } finally {
    await client.end();
  }
}
