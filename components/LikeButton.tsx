"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

// Every LikeButton mounting in the same render pass shares one
// GET /api/likes request instead of firing one request per button.
let pending: Map<string, ((count: number) => void)[]> | null = null;

function getCount(slug: string): Promise<number> {
  return new Promise((resolve) => {
    if (!pending) {
      pending = new Map();
      queueMicrotask(flushCounts);
    }
    const resolvers = pending.get(slug);
    if (resolvers) resolvers.push(resolve);
    else pending.set(slug, [resolve]);
  });
}

// Matches MAX_SLUGS_PER_QUERY in app/api/likes/route.ts — the API silently
// drops slugs beyond it, so bigger batches must be split.
const MAX_SLUGS_PER_REQUEST = 100;

async function flushCounts() {
  const batch = pending;
  pending = null;
  if (!batch) return;
  const slugs = [...batch.keys()];
  const counts: Record<string, number> = {};
  const chunks: string[][] = [];
  for (let i = 0; i < slugs.length; i += MAX_SLUGS_PER_REQUEST) {
    chunks.push(slugs.slice(i, i + MAX_SLUGS_PER_REQUEST));
  }
  await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const res = await fetch(
          `/api/likes?slugs=${encodeURIComponent(chunk.join(","))}`
        );
        if (res.ok) Object.assign(counts, (await res.json()).counts ?? {});
      } catch (error) {
        console.error("Failed to fetch like counts:", error);
      }
    })
  );
  for (const [slug, resolvers] of batch) {
    for (const resolve of resolvers) resolve(counts[slug] ?? 0);
  }
}

const HEART = "#ff3040";

// Burst dots radiate from the heart's center; alternating radii and sizes
// keep the spray from reading as a rigid geometric ring.
const PARTICLES = [
  { x: 0, y: -13, s: 2.5 },
  { x: 9, y: -9, s: 2 },
  { x: 13, y: 0, s: 2.5 },
  { x: 9, y: 9, s: 2 },
  { x: 0, y: 13, s: 2.5 },
  { x: -9, y: 9, s: 2 },
  { x: -13, y: 0, s: 2.5 },
  { x: -9, y: -9, s: 2 },
];

// Rolls the old digit out and the new one in, upward on increment and
// downward on decrement. The first resolved count only rolls in.
function RollingCount({ value }: { value: number | null }) {
  // Previous value and roll direction are tracked as state adjusted during
  // render so the outgoing digit starts rolling in the same render. The
  // direction is stored (not re-derived) so clearing `prev` after the roll
  // can't flip the incoming digit's animation class and restart it.
  const [display, setDisplay] = useState<{
    value: number | null;
    prev: number | null;
    dir: 1 | -1 | 0;
  }>({ value, prev: null, dir: 0 });
  if (display.value !== value) {
    setDisplay({
      value,
      prev: display.value,
      dir:
        value === null
          ? 0
          : display.value === null || value > display.value
            ? 1
            : -1,
    });
  }
  const { prev, dir } = display;

  return (
    <span className="relative inline-flex overflow-hidden tabular-nums leading-none py-px">
      <span
        key={value ?? "pending"}
        className={
          dir === 1
            ? "motion-safe:animate-roll-up-in"
            : dir === -1
              ? "motion-safe:animate-roll-down-in"
              : ""
        }
      >
        {value ?? " "}
      </span>
      {dir !== 0 && prev !== null && (
        <span
          key={`${prev}-${value}`}
          aria-hidden="true"
          // Unmount once rolled out; otherwise the invisible old digit stays
          // in the DOM forever and pollutes the button's text content.
          onAnimationEnd={() =>
            setDisplay((d) => (d.prev === null ? d : { ...d, prev: null }))
          }
          className={`absolute inset-x-0 top-0 py-px motion-reduce:hidden ${
            dir === 1
              ? "motion-safe:animate-roll-up-out"
              : "motion-safe:animate-roll-down-out"
          }`}
        >
          {prev}
        </span>
      )}
    </span>
  );
}

export default function LikeButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  // Click animations only play on an actual click, not when the liked
  // state is restored from localStorage on mount.
  const [anim, setAnim] = useState<"pop" | "unpop" | null>(null);
  // Remounting the burst layer with a fresh key restarts its CSS animations.
  const [burstKey, setBurstKey] = useState(0);
  // Desired liked state, mirroring `liked` for reads inside async code.
  const likedRef = useRef(false);
  // Last liked state the server has acknowledged; syncLiked drives it
  // toward likedRef.
  const syncedRef = useRef(false);
  // Only one POST is ever in flight; further toggles are picked up by the
  // sync loop when the current request settles.
  const inFlight = useRef(false);

  useEffect(() => {
    let active = true;
    try {
      likedRef.current = localStorage.getItem(`liked:${slug}`) === "1";
      syncedRef.current = likedRef.current;
      setLiked(likedRef.current);
    } catch {}
    getCount(slug).then((n) => {
      // A click may have set an optimistic (or POST-returned) count before
      // this resolved; never clobber a newer count with a stale fetch.
      if (active) setCount((c) => (c === null ? n : c));
    });
    return () => {
      active = false;
    };
  }, [slug]);

  function handleToggle() {
    const unliking = likedRef.current;
    likedRef.current = !unliking;
    setLiked(!unliking);
    setAnim(unliking ? "unpop" : "pop");
    if (!unliking) setBurstKey((k) => k + 1);
    setCount((c) => Math.max(0, (c ?? 0) + (unliking ? -1 : 1)));
    try {
      if (unliking) localStorage.removeItem(`liked:${slug}`);
      else localStorage.setItem(`liked:${slug}`, "1");
    } catch {}
    void syncLiked();
  }

  // Coalesces rapid toggles: each response re-checks the desired state and
  // sends a follow-up request if the user toggled again mid-flight, so a
  // like immediately followed by an unlike still nets out on the server.
  async function syncLiked() {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      while (syncedRef.current !== likedRef.current) {
        const target = likedRef.current;
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, action: target ? "like" : "unlike" }),
        });
        if (!res.ok) throw new Error(`POST /api/likes ${res.status}`);
        syncedRef.current = target;
        const data: { count?: number } = await res.json();
        // Skip the server count if another toggle is already pending; the
        // follow-up response will carry the up-to-date value.
        if (typeof data.count === "number" && likedRef.current === target) {
          setCount(data.count);
        }
      }
    } catch (error) {
      // Roll back to the last server-acknowledged state so the visitor can
      // retry.
      console.error("Failed to save like:", error);
      const delta = (syncedRef.current ? 1 : 0) - (likedRef.current ? 1 : 0);
      likedRef.current = syncedRef.current;
      setLiked(syncedRef.current);
      setAnim(null);
      if (delta !== 0) setCount((c) => Math.max(0, (c ?? 0) + delta));
      try {
        if (syncedRef.current) localStorage.setItem(`liked:${slug}`, "1");
        else localStorage.removeItem(`liked:${slug}`);
      } catch {}
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={liked}
      // The label carries the count because aria-label hides the visible
      // count text from screen readers.
      aria-label={`${liked ? "Unlike" : "Like"}${
        count === null ? "" : `, ${count} ${count === 1 ? "like" : "likes"}`
      }`}
      className={`group/like inline-flex items-center gap-1 align-middle bg-transparent text-xs text-muted-foreground cursor-pointer select-none transition-opacity duration-200 ${className}`}
    >
      <span className="relative inline-flex" aria-hidden="true">
        {burstKey > 0 && (
          <span key={burstKey} className="pointer-events-none absolute inset-0">
            <span
              className="absolute inset-0 rounded-full border opacity-0 motion-safe:animate-like-ring"
              style={{ borderColor: HEART }}
            />
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full opacity-0 motion-safe:animate-like-particle"
                style={
                  {
                    width: p.s,
                    height: p.s,
                    marginLeft: -p.s / 2,
                    marginTop: -p.s / 2,
                    backgroundColor: HEART,
                    "--tx": `${p.x}px`,
                    "--ty": `${p.y}px`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onAnimationEnd={() => setAnim(null)}
          className={`h-3.5 w-3.5 transition-[fill,stroke,transform] duration-300 motion-reduce:transition-none group-active/like:scale-90 ${
            liked
              ? "fill-[#ff3040] stroke-[#ff3040]"
              : "fill-transparent stroke-current group-hover/like:stroke-[#ff3040]"
          } ${
            anim === "pop"
              ? "motion-safe:animate-heart-pop"
              : anim === "unpop"
                ? "motion-safe:animate-heart-unpop"
                : ""
          }`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </span>
      <RollingCount value={count} />
    </button>
  );
}
