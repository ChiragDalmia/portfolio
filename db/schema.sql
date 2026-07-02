-- Tables required by the app (lib/comment-actions.ts, app/api/likes/route.ts).
-- Run against the Neon database pointed to by POSTGRES_URL.

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  name text,
  avatar_url text,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS likes (
  slug text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0
);
