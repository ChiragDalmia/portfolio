import Image from "next/image";
import TimeAgo from "./TimeAgo";
import DeleteCommentButton from "./DeleteComment";
import LikeButton from "@/components/LikeButton";
import type { Comment } from "@/lib/comment-actions";
import { siteConfig } from "@/lib/config";

export default function Component({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold mb-4">
        {siteConfig.guestbook.commentsHeading}
      </h2>
      {comments.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {siteConfig.guestbook.emptyState}
        </p>
      )}
      <ul className="space-y-4">
        {comments.map(
          ({ id, username, name, avatar_url, content, created_at }) => (
            <li
              key={id}
              className="flex items-start space-x-3 group relative  rounded-lg p-2 transition-colors"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full"
                >
                  {avatar_url ? (
                    <Image
                      src={avatar_url}
                      alt={name ?? username}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-full w-full items-center justify-center bg-muted text-sm font-semibold text-foreground"
                      aria-hidden="true"
                    >
                      {(name ?? username).charAt(0).toUpperCase()}
                    </span>
                  )}
                </a>
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-3">
                  <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold truncate"
                  >
                    {name ?? username}
                  </a>
                  <time
                    dateTime={created_at}
                    className="text-xs text-gray-500 dark:text-gray-400 shrink-0"
                    suppressHydrationWarning
                  >
                    <TimeAgo timestamp={created_at} />
                  </time>
                  <LikeButton slug={`comment:${id}`} />
                </div>
                <p className="text-sm wrap-break-word">{content}</p>
              </div>
              <div className="absolute right-2 top-2">
                <DeleteCommentButton commentId={id} userName={username} />
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
