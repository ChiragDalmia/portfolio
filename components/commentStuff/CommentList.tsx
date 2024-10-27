import Link from "next/link";
import Image from "next/image";

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
    <ul className="space-y-4">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      {comments.map(
        ({ id, username, name, avatar_url, content, created_at }) => (
          <li key={id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <Link
              href={`/profile/${username}`}
              className="flex items-center mb-2"
            >
              <Image
                src={avatar_url}
                alt=""
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <span className="font-semibold">{name}</span>
            </Link>
            <p className="mb-2">{content}</p>
            <time dateTime={created_at} className="text-sm text-gray-500">
              {new Date(created_at).toLocaleString()}
            </time>
          </li>
        )
      )}
    </ul>
  );
}
