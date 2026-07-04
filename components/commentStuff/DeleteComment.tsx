"use client";

import { useActionState } from "react";
import { deleteComment, type CommentActionState } from "@/lib/comment-actions";
import { useSession } from "next-auth/react";
import { siteConfig } from "@/lib/config";

const ADMIN_USERNAME = siteConfig.author.githubUsername;

type DeleteCommentButtonProps = {
  commentId: string;
  userName: string;
};

export default function Component({
  commentId,
  userName,
}: DeleteCommentButtonProps) {
  const initialState: CommentActionState = { success: false };
  const [state, deleteAction] = useActionState(deleteComment, initialState);
  const { data: session } = useSession();

  const canDelete =
    session?.user?.username === userName ||
    session?.user?.username === ADMIN_USERNAME;

  if (!canDelete) return <div className="w-8" aria-hidden="true" />;

  return (
    <form
      action={deleteAction}
      // Deleting is permanent, so a stray tap shouldn't be enough.
      onSubmit={(e) => {
        if (!confirm("Delete this comment? This can't be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="commentId" value={commentId} />
      <button
        type="submit"
        // Hidden until hover on pointer devices, but always visible on
        // keyboard focus and on touch screens (no hover to reveal it).
        className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100 transition-all duration-200 bg-transparent"
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
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
      {state.error && (
        <p className="text-red-500 text-sm absolute mt-2 right-0 whitespace-nowrap">
          {state.error}
        </p>
      )}
    </form>
  );
}
