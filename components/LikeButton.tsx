"use client";

import { useState, useEffect, useCallback } from "react";

interface LikeCounterProps {
  slug: string;
}

interface LikeState {
  count: number;
  localCount: number;
  isLoading: boolean;
  error: string | null;
}

interface LikeResponse {
  count: number;
}

export default function LikeCounter({ slug }: LikeCounterProps) {
  const [state, setState] = useState<LikeState>({
    count: 0,
    localCount: 0,
    isLoading: false,
    error: null,
  });
  const { count, localCount, isLoading, error } = state;

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch(`/api/likes?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error("Failed to fetch like count");
      const data: LikeResponse = await res.json();
      setState((s) => ({ ...s, count: data.count, localCount: 0 }));
    } catch (err) {
      console.error("Error fetching like count:", err);
      setState((s) => ({ ...s, error: "Failed to load like count" }));
    }
  }, [slug]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

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

      const data: LikeResponse = await res.json();
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
    <div>
      <button onClick={handleLike} disabled={isLoading} aria-label="Like">
        Like ({count + localCount})
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
