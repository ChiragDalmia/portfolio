"use client";

import Image from "next/image";
import Link from "next/link";
import TimeAgo from "./TimeAgo";
import { useSession } from "next-auth/react";
import { useActionState } from "react";
import { deleteComment, type CommentActionState } from "@/lib/comment-actions";

type Comment = {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  content: string;
  created_at: string;
};

export default function CommentList({ comments }: { comments: Comment[] }) {
  const { data: session } = useSession();
  const initialState: CommentActionState = { success: false };
  const [state, deleteAction] = useActionState(deleteComment, initialState);

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <ul className="space-y-4">
        {comments.map(
          ({ id, username, name, avatar_url, content, created_at }) => (
            <li key={id} className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={avatar_url}
                  alt={name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <Link
                    href={`https://github.com/${username}`}
                    className="font-medium"
                  >
                    {name}
                  </Link>
                  <time dateTime={created_at} className="text-xs text-gray-400">
                    <TimeAgo timestamp={created_at} />
                  </time>
                </div>
                <p className="text-sm">{content}</p>
              </div>
              {session?.user?.username === username && (
                <form action={deleteAction}>
                  <input type="hidden" name="commentId" value={id} />
                  <button
                    type="submit"
                    className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer p-2"
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
                </form>
              )}
            </li>
          )
        )}
      </ul>
      {state.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
    </div>
  );
}
