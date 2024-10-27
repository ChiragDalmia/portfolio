import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const result = await sql`
    SELECT * FROM comments
    ORDER BY created_at DESC
  `;
  return NextResponse.json(result.rows);
}
