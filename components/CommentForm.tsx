"use client";

import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addComment } from "@/lib/comment-actions";

export default function CommentForm() {
  const [newComment, setNewComment] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(newComment);
      setNewComment("");
      router.refresh();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (!session?.user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-14 left-0 w-full flex justify-center"
    >
      <div className="relative w-full max-w-96 h-12 bg-gray-100 dark:bg-gray-900 rounded-full">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full h-full bg-transparent px-4 py-2 pr-16 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your comment..."
          maxLength={500}
          required
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4"
          disabled={!newComment.trim()}
        >
          Post
        </button>
      </div>
    </form>
  );
}
