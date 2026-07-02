import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const result = await sql`
    SELECT * FROM comments
    ORDER BY created_at DESC
  `;
  return NextResponse.json(result.rows);
}
