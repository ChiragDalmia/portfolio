"use client";

import { useActionState } from "react";
import { deleteComment, type CommentActionState } from "@/lib/comment-actions";
import { useSession } from "next-auth/react";

type DeleteCommentButtonProps = {
  commentId: string;
  userName: string;
};

export default function DeleteCommentButton({
  commentId,
  userName,
}: DeleteCommentButtonProps) {
  const initialState: CommentActionState = { success: false };
  const [state, deleteAction] = useActionState(deleteComment, initialState);
  const { data: session } = useSession();

  const canDelete =
    session?.user?.username === userName ||
    session?.user?.username === "ChiragDalmia";

  if (!canDelete) return <div className="w-8" aria-hidden="true" />;

  return (
    <form action={deleteAction}>
      <input type="hidden" name="commentId" value={commentId} />
      <button
        type="submit"
        className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Delete comment"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
      {state.error && (
        <p className="text-red-500 text-sm absolute mt-2">{state.error}</p>
      )}
    </form>
  );
}
