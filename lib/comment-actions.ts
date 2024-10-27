"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { auth } from "@/lib/auth";

export async function getComments() {
  const result = await sql`
    SELECT * FROM comments
    ORDER BY created_at DESC
  `;
  return result.rows;
}

export async function addComment(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const content = formData.get("content") as string;

  if (!content || content.trim() === "") {
    return { error: "Comment cannot be empty" };
  }

  try {
    const result = await sql`
      INSERT INTO comments (username, name, avatar_url, content)
      VALUES (${session.user.username}, ${session.user.name}, ${session.user.image}, ${content})
      RETURNING *
    `;

    revalidatePath("/");
    return { success: true, comment: result.rows[0] };
  } catch (error) {
    console.error("Error inserting comment:", error);
    return { error: "Failed to add comment" };
  }
}
