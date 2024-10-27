"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Comment {
  id: number;
  username: string;
  content: string;
  created_at: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });

    if (response.ok) {
      setNewComment("");
      fetchComments();
    }
  };

  return (
    <div>
      {session?.user && (
        <form onSubmit={handleSubmit} >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
           
            placeholder="Write your comment..."
            rows={3}
          />
          <button
            type="submit"
          
          >
            Post Comment
          </button>
        </form>
      )}
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.username}</p>
            <p>{comment.content}</p>
            <p >
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
