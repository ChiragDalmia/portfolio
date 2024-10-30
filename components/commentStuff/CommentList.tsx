import Image from "next/image";
import Link from "next/link";
import TimeAgo from "./TimeAgo";
import DeleteCommentButton from "./DeleteComment";

type Comment = {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  content: string;
  created_at: string;
};

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <ul className="space-y-4">
        {comments.map(
          ({ id, username, name, avatar_url, content, created_at }) => (
            <li key={id} className="flex items-start space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Link href={`https://github.com/${username}`}>
                  <Image
                    src={avatar_url}
                    alt={name}
                    width={40}
                    height={40}
                    className="object-cover"
                    priority
                  />
                </Link>
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-3">
                  <Link
                    href={`https://github.com/${username}`}
                    className="text-xs font-semibold truncate"
                  >
                    {name}
                  </Link>
                  <time
                    dateTime={created_at}
                    className="text-xs text-gray-400 flex-shrink-0"
                  >
                    <TimeAgo timestamp={created_at} />
                  </time>
                </div>
                <p className="text-sm break-words">{content}</p>
              </div>
              <div className="flex-shrink-0 opacity-0 hover:opacity-100 transition-opacity duration-200">
                <DeleteCommentButton commentId={id} userName={username} />
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
