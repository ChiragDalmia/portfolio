"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });
    if (res.ok) {
      setNewComment("");
      fetch("/api/comments")
        .then((res) => res.json())
        .then(setComments);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul className="space-y-4">
        {comments.map(
          ({ id, username, name, avatar_url, content, created_at }) => (
            <li
              key={id}
              className="bg-gray-100 dark:bg-gray-800  rounded-lg p-4"
            >
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
      {session?.user && (
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
      )}
    </section>
  );
}
