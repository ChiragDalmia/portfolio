import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

const rateLimitCache = new Map<string, number[]>();

async function rateLimit(ip: string): Promise<boolean> {
  const now = Date.now();
  const requests = rateLimitCache.get(ip) || [];
  const recentRequests = requests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= MAX_REQUESTS) return false;

  recentRequests.push(now);
  rateLimitCache.set(ip, recentRequests);
  return true;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug)
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });

  const result = await sql`SELECT count FROM likes WHERE slug = ${slug}`;
  const count = result.rows[0]?.count || 0;

  return NextResponse.json({ count });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!(await rateLimit(ip))) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { slug, increment } = await request.json();
  if (!slug || typeof increment !== "number") {
    return NextResponse.json(
      { error: "Slug and increment are required" },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO likes (slug, count)
    VALUES (${slug}, ${increment})
    ON CONFLICT (slug)
    DO UPDATE SET count = likes.count + ${increment}
  `;

  const result = await sql`SELECT count FROM likes WHERE slug = ${slug}`;
  const count = result.rows[0].count;

  return NextResponse.json({ count });
}
