import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { auth } from "@/lib/auth";

export async function GET() {
  const result = await sql`
    SELECT * FROM comments
    ORDER BY created_at DESC
  `;
  return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await request.json();
  if (!content) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  try {
    const result = await sql`
      INSERT INTO comments (username, name, avatar_url, content)
      VALUES (${session.user.username}, ${session.user.name}, ${session.user.image}, ${content})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting comment:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
