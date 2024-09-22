"use client";

import { useState, useEffect } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLikes = async () => {
    try {
      const response = await fetch(
        `/api/likes?slug=${encodeURIComponent(slug)}`
      );
      if (!response.ok) throw new Error("Failed to fetch likes");
      const data = await response.json();
      setLikes(data.likes);
    } catch (err) {
      setError("Failed to fetch likes");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLikes();
  });

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/likes?slug=${encodeURIComponent(slug)}`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Failed to update likes");
      const data = await response.json();
      setLikes(data.likes);
    } catch (err) {
      setError("Failed to update likes");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? "Loading..." : `Like (${likes})`}
    </button>
  );
}
