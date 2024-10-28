"use client";

import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from "react-dom";
import { addComment, type CommentActionState } from "@/lib/comment-actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="absolute right-0 top-0 h-full px-4"
      disabled={pending}
    >
      {pending ? "Posting..." : "Post"}
    </button>
  );
}

export default function CommentForm() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const initialState: CommentActionState = { success: false };
  const [state, formAction] = useFormState(addComment, initialState);

  if (!session?.user) return null;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="fixed bottom-14 left-0 w-full flex justify-center"
    >
      <div className="relative w-full max-w-96 h-12 bg-gray-100 dark:bg-gray-900 rounded-full">
        <input
          name="content"
          className="w-full h-full bg-transparent px-4 py-2 pr-16 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your comment..."
          maxLength={500}
          autoComplete="off"
          required
        />
        <SubmitButton />
      </div>
      {state.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
    </form>
  );
}
