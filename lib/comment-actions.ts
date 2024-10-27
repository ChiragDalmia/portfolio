"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { auth } from "@/lib/auth";

export type Comment = {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  content: string;
  created_at: string;
};

type CommentActionState = {
  error?: string;
  success?: boolean;
  comment?: Comment;
};

export async function getComments(): Promise<Comment[]> {
  const result = await sql`
    SELECT id, username, name, avatar_url, content, created_at::text
    FROM comments
    ORDER BY created_at DESC
  `;

  return result.rows.map((row) => ({
    id: row.id,
    username: row.username,
    name: row.name,
    avatar_url: row.avatar_url,
    content: row.content,
    created_at: row.created_at,
  }));
}

export async function addComment(
  prevState: CommentActionState,
  formData: FormData
): Promise<CommentActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const content = formData.get("content");
  if (!content || typeof content !== "string" || content.trim() === "") {
    return { error: "Comment cannot be empty" };
  }

  try {
    const result = await sql`
      INSERT INTO comments (username, name, avatar_url, content)
      VALUES (${session.user.username}, ${session.user.name}, ${session.user.image}, ${content})
      RETURNING id, username, name, avatar_url, content, created_at::text
    `;

    const newComment: Comment = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      name: result.rows[0].name,
      avatar_url: result.rows[0].avatar_url,
      content: result.rows[0].content,
      created_at: result.rows[0].created_at,
    };

    revalidatePath("/");
    return { success: true, comment: newComment };
  } catch (error) {
    console.error("Error inserting comment:", error);
    return { error: "Failed to add comment" };
  }
}
