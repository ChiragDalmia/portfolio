"use server";

export async function getComments() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/comments`);
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }
  return res.json();
}

export async function addComment(content: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    throw new Error("Failed to add comment");
  }
  return res.json();
}
