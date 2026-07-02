"use client";

import { useState, useEffect, useCallback } from "react";

interface LikeButtonProps {
  slug: string;
  initialCount: number;
}

export function LikeCounter({ slug, initialCount }: LikeButtonProps) {
  const [state, setState] = useState({
    count: initialCount,
    localCount: 0,
    isLoading: false,
    error: null as string | null,
  });
  const { count, localCount, isLoading } = state;

  const updateLikes = useCallback(async () => {
    if (localCount === 0) return;

    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, increment: localCount }),
      });

      if (!res.ok) {
        throw new Error(
          res.status === 429
            ? "Rate limit exceeded. Please try again later."
            : "Failed to update like count"
        );
      }

      const data: { count: number } = await res.json();
      setState((s) => ({
        ...s,
        count: data.count,
        localCount: 0,
        isLoading: false,
      }));
    } catch (err) {
      console.error("Error updating like count:", err);
      setState((s) => ({
        ...s,
        error: err instanceof Error ? err.message : "An unknown error occurred",
        isLoading: false,
      }));
    }
  }, [slug, localCount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localCount > 0) {
        updateLikes();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [localCount, updateLikes]);

  const handleLike = useCallback(() => {
    setState((s) => ({
      ...s,
      localCount: s.localCount + 1,
    }));
  }, []);

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className="group flex items-center justify-center px-2 py-1 bg-background border-2 border-foreground rounded-full cursor-pointer transition-all duration-200 ease-in-out outline-hidden active:scale-95 ml-auto"
      aria-label="Like"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 mr-2 transition-all fill-none duration-200 ease-in-out stroke-foreground group-hover:stroke-red-500 group-active:fill-red-500 group-active:stroke-red-500 group-active:scale-125"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span className="text-sm font-semibold text-foreground">
        {count + localCount}
      </span>
    </button>
  );
}
