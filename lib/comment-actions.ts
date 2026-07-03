"use server";

import { revalidatePath, updateTag, unstable_cache } from "next/cache";
import { sql } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ADMIN_USERNAME } from "@/lib/constants";

export type Comment = {
  id: string;
  username: string;
  // Older rows may predate the insert-time fallbacks below, so both stay
  // nullable and the UI falls back to the username.
  name: string | null;
  avatar_url: string | null;
  content: string;
  created_at: string;
};

export type CommentActionState = {
  error?: string;
  success?: boolean;
  comment?: Comment;
};

const MAX_COMMENT_LENGTH = 500;
const MAX_COMMENTS_PER_MINUTE = 3;
const MAX_COMMENTS_SHOWN = 100;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Postgres' text form ("2026-07-03 12:34:56+00") isn't a valid HTML <time>
// datetime and Safari has historically refused to parse it, so timestamps
// are normalized to ISO 8601 before reaching the client.
function toIso(timestamp: string): string {
  return new Date(timestamp).toISOString();
}

export const getComments = unstable_cache(
  async (): Promise<Comment[]> => {
    const result =
      await sql`SELECT id, username, name, avatar_url, content, created_at::text FROM comments ORDER BY created_at DESC LIMIT ${MAX_COMMENTS_SHOWN}`;
    return result.rows.map((row) => ({
      id: row.id,
      username: row.username,
      name: row.name,
      avatar_url: row.avatar_url,
      content: row.content,
      created_at: toIso(row.created_at),
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
  // username is only set on tokens minted after the jwt callback shipped;
  // treat sessions without it as signed out rather than inserting NULL.
  const username = session?.user?.username;
  if (!username) {
    return { error: "Unauthorized" };
  }

  const rawContent = formData.get("content");
  const content = typeof rawContent === "string" ? rawContent.trim() : "";
  if (content === "") {
    return { error: "Comment cannot be empty" };
  }
  if (content.length > MAX_COMMENT_LENGTH) {
    return { error: "Comment is too long (max 500 characters)" };
  }

  try {
    // Approximate per-user throttle; parallel submissions may slip past it,
    // but it bounds sustained spam from any single GitHub account.
    const recent = await sql`
      SELECT count(*)::int AS recent FROM comments
      WHERE username = ${username}
        AND created_at > now() - interval '1 minute'
    `;
    if (Number(recent.rows[0].recent) >= MAX_COMMENTS_PER_MINUTE) {
      return { error: "You're commenting too fast — try again in a minute" };
    }

    const result = await sql`
      INSERT INTO comments (username, name, avatar_url, content)
      VALUES (${username}, ${session.user.name ?? username}, ${session.user.image ?? null}, ${content})
      RETURNING id, username, name, avatar_url, content, created_at::text
    `;
    const newComment: Comment = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      name: result.rows[0].name,
      avatar_url: result.rows[0].avatar_url,
      content: result.rows[0].content,
      created_at: toIso(result.rows[0].created_at),
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
  const username = session?.user?.username;
  if (!username) {
    return { error: "Unauthorized" };
  }

  const commentId = formData.get("commentId");
  if (typeof commentId !== "string" || !UUID.test(commentId)) {
    return { error: "Invalid comment ID" };
  }

  const isAdmin = username === ADMIN_USERNAME;
  try {
    // Single statement so the comment and its like count can't get out of
    // sync if one of two separate deletes were to fail.
    const result = await sql`
      WITH deleted AS (
        DELETE FROM comments
        WHERE id = ${commentId}
          AND (username = ${username} OR ${isAdmin})
        RETURNING id
      ),
      unliked AS (
        DELETE FROM likes
        WHERE slug IN (SELECT 'comment:' || id::text FROM deleted)
      )
      SELECT id FROM deleted
    `;
    if (result.rowCount === 0) {
      return {
        error: "Comment not found or you're not authorized to delete it",
      };
    }
    updateTag("comments");
    revalidatePath("/guestlog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { error: "Failed to delete comment" };
  }
}
