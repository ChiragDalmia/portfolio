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

-- Aggregate like counts, one row per liked entity. Slug namespaces:
--   'site'            -> footer/site like button
--   'project:<name>'  -> project likes (names from lib/projects.ts)
--   'comment:<uuid>'  -> comment likes (row deleted with the comment)
-- One-like-per-visitor is enforced on the device via localStorage, so no
-- per-visitor rows are needed here.
CREATE TABLE IF NOT EXISTS likes (
  slug text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0 CHECK (count >= 0)
);
