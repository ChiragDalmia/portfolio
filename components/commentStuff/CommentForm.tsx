"use client";

import { useSession } from "next-auth/react";
import { useActionState } from "react";
import { addComment, type CommentActionState } from "@/lib/comment-actions";
import { siteConfig } from "@/lib/config";

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      className="absolute right-0 top-0 h-full px-4 transition-opacity disabled:opacity-50"
      disabled={isPending}
    >
      {isPending
        ? siteConfig.guestbook.postingLabel
        : siteConfig.guestbook.postLabel}
    </button>
  );
}

export default function CommentForm() {
  const { data: session } = useSession();
  const initialState: CommentActionState = { success: false };
  const [state, formAction, isPending] = useActionState(
    addComment,
    initialState
  );

  if (!session?.user) return null;

  return (
    <>
      {/* Reserve scroll space so the fixed bar doesn't cover the last comment. */}
      <div className="h-24" aria-hidden="true" />
      <form
        action={formAction}
        className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-xs p-4"
      >
        {state.error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {state.error} :(
          </p>
        )}
        <div className="relative w-full max-w-96 h-12 bg-gray-100 dark:bg-gray-900 rounded-full mx-auto">
          <input
            name="content"
            className="w-full h-full bg-transparent px-4 py-2 pr-24 rounded-full focus:outline-hidden focus:ring-2 focus:ring-primary"
            placeholder={siteConfig.guestbook.inputPlaceholder}
            maxLength={500}
            autoComplete="off"
            required
          />
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </>
  );
}
