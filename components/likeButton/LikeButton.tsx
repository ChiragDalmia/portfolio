"use server"
import { headers } from "next/headers";
import { LikeCounter } from "./LikeCounter";


async function getLikeCount(slug: string): Promise<number> {
  const headersList = headers();
  const apiUrl = headersList.get('X-API-URL') || 'http://localhost:3000';
  const res = await fetch(
    `${apiUrl}/api/likes?slug=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch like count");
  const data: { count: number } = await res.json();
  return data.count;
}

interface LikeCounterProps {
  slug: string;
}

export default async function LikeButton({ slug }: LikeCounterProps) {
  const initialCount = await getLikeCount(slug);

  return <LikeCounter slug={slug} initialCount={initialCount} />;
}
