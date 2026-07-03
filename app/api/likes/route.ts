import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { personalProjects, hackathonProjects } from "@/lib/projects";

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30;
const MAX_SLUGS_PER_QUERY = 100;

// Only known entities can be liked: the site footer, a real project, or a comment.
const PROJECT_SLUGS = new Set(
  [...personalProjects, ...hackathonProjects].map((p) => `project:${p.name}`)
);
const COMMENT_SLUG =
  /^comment:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isLikeableSlug(slug: string): boolean {
  return slug === "site" || PROJECT_SLUGS.has(slug) || COMMENT_SLUG.test(slug);
}

const rateLimitCache = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const recentRequests = (rateLimitCache.get(ip) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= MAX_REQUESTS) return false;

  recentRequests.push(now);
  // Prune only expired entries so an over-limit IP can't get a fresh
  // allowance just because someone else's request triggered a cleanup.
  if (rateLimitCache.size > 1000) {
    for (const [key, times] of rateLimitCache) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW)) {
        rateLimitCache.delete(key);
      }
    }
  }
  rateLimitCache.set(ip, recentRequests);
  return true;
}

// Clients can send their own x-forwarded-for values, which proxies prepend
// to; only the entry appended by the platform's own proxy (the last one) is
// trustworthy. Note the cache above is per serverless instance, so the limit
// is approximate across instances — accepted for this traffic.
function clientIp(request: Request): string {
  return (
    (request.headers.get("x-forwarded-for") ?? "")
      .split(",")
      .at(-1)
      ?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugs = [
    ...new Set((searchParams.get("slugs") ?? "").split(",").filter(Boolean)),
  ].slice(0, MAX_SLUGS_PER_QUERY);

  if (slugs.length === 0) {
    return NextResponse.json({ error: "slugs is required" }, { status: 400 });
  }

  let result;
  try {
    result = await sql`SELECT slug, count FROM likes WHERE slug = ANY(${slugs})`;
  } catch (error) {
    console.error("Failed to load like counts:", error);
    return NextResponse.json(
      { error: "Failed to load like counts" },
      { status: 500 }
    );
  }

  const counts: Record<string, number> = {};
  for (const slug of slugs) counts[slug] = 0;
  for (const row of result.rows) counts[row.slug] = Number(row.count);

  return NextResponse.json({ counts });
}

export async function POST(request: Request) {
  if (!rateLimit(clientIp(request))) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let slug: unknown;
  let action: unknown;
  try {
    ({ slug, action } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof slug !== "string" || !isLikeableSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  if (action !== undefined && action !== "like" && action !== "unlike") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  // One like per device is enforced client-side (localStorage), and the
  // rate limit bounds abuse from clients that bypass it.
  try {
    if (action === "unlike") {
      const result = await sql`
        UPDATE likes
        SET count = GREATEST(likes.count - 1, 0)
        WHERE slug = ${slug}
        RETURNING count
      `;
      return NextResponse.json({ count: Number(result.rows[0]?.count ?? 0) });
    }

    const result = await sql`
      INSERT INTO likes (slug, count)
      VALUES (${slug}, 1)
      ON CONFLICT (slug)
      DO UPDATE SET count = likes.count + 1
      RETURNING count
    `;

    return NextResponse.json({ count: Number(result.rows[0].count) });
  } catch (error) {
    console.error("Failed to save like:", error);
    return NextResponse.json(
      { error: "Failed to save like" },
      { status: 500 }
    );
  }
}
