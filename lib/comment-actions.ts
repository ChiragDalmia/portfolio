"use server";

import { revalidatePath, updateTag, unstable_cache } from "next/cache";
import { sql } from "@/lib/db";
import { auth } from "@/lib/auth";

export type Comment = {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  content: string;
  created_at: string;
};

export type CommentActionState = {
  error?: string;
  success?: boolean;
  comment?: Comment;
};

export const getComments = unstable_cache(
  async (): Promise<Comment[]> => {
    const result =
      await sql`SELECT id, username, name, avatar_url, content, created_at::text FROM comments ORDER BY created_at DESC`;
    return result.rows.map((row) => ({
      id: row.id,
      username: row.username,
      name: row.name,
      avatar_url: row.avatar_url,
      content: row.content,
      created_at: row.created_at,
    }));
  },
  ["comments"],
  { revalidate: 1, tags: ["comments"] } // Revalidate every second
);

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
  if (content.length > 500) {
    return { error: "Comment is too long (max 500 characters)" };
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
    updateTag("comments");
    revalidatePath("/guestlog");
    return { success: true, comment: newComment };
  } catch (error) {
    console.error("Error inserting comment:", error);
    return { error: "Failed to add comment" };
  }
}

export async function deleteComment(
  prevState: CommentActionState,
  formData: FormData
): Promise<CommentActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const commentId = formData.get("commentId");
  if (!commentId || typeof commentId !== "string") {
    return { error: "Invalid comment ID" };
  }

  try {
    const result = await sql`
      DELETE FROM comments
      WHERE id = ${commentId} 
       AND (username = ${session.user.username} OR ${session.user.username} = 'ChiragDalmia')
      RETURNING id
    `;
    if (result.rowCount === 0) {
      return {
        error: "Comment not found or you're not authorized to delete it",
      };
    }
    await sql`DELETE FROM likes WHERE slug = ${`comment:${commentId}`}`;
    updateTag("comments");
    revalidatePath("/guestlog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { error: "Failed to delete comment" };
  }
}
