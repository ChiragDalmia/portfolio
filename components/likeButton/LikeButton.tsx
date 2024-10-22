import { headers } from "next/headers";
import { LikeCounter } from "./LikeCounter";

async function getLikeCount(slug: string): Promise<number> {
  const headersList = await headers();
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = headersList.get("host") || "localhost:3000";
  const apiUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(
      `${apiUrl}/api/likes?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch like count: ${res.status} ${res.statusText}`
      );
    }
    const data: { count: number } = await res.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching like count:", error);
    return 0; // Return a default value in case of error
  }
}

interface LikeCounterProps {
  slug: string;
}

export default async function LikeButton({ slug }: LikeCounterProps) {
  const initialCount = await getLikeCount(slug);

  return <LikeCounter slug={slug} initialCount={initialCount} />;
}
