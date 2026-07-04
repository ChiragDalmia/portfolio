# Portfolio

A minimal, fast personal portfolio built with Next.js (App Router), Tailwind CSS v4, NextAuth (GitHub login), and Neon Postgres. It includes a projects showcase, an experience list, a GitHub-authenticated guestbook, and per-item "like" buttons.

## Make it yours

**Edit one file: [`lib/config.ts`](lib/config.ts).** Every piece of on-screen content — your name, bio, projects, experience, links, navigation, section headings, SEO/Open Graph copy, and page text — lives there. You should not need to touch any component or page.

Then replace two images with your own (keep the filenames):

- `app/opengraph-image.png` — the social-share preview image
- `app/favicon.ico` — the browser tab icon

What each section of `lib/config.ts` controls:

| Section | Controls |
| --- | --- |
| `author` | Your name, role, and GitHub username (the guestbook admin who can delete any comment) |
| `site` | Your production URL (used for canonical links, sitemap, robots, Open Graph) |
| `seo` | Page/share title, title template, description, Open Graph site name, X/Twitter handle |
| `nav` | Header navigation links (also builds the sitemap) |
| `social` | Footer social links |
| `home` | Intro heading + bio, project section headings, and the Experience list |
| `projectsPage` | Titles/headings for the `/projects` page |
| `guestlog` | `/guestlog` page title + description |
| `projects` | Your `personal` and `hackathon` project lists (shown on both pages) |
| `guestbook` | Guestbook UI labels (Comments heading, empty state, input, buttons, sign in/out) |
| `errorPage` / `notFound` | Copy for the error and 404 pages |

The file is fully typed and commented — the `RichText`, `Project`, and `ExperienceItem` types at the top explain the less-obvious fields (like inline links in the bio).

## Local setup

1. `pnpm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - `AUTH_SECRET` — any random string (`openssl rand -base64 32`)
   - `POSTGRES_URL` — a Neon (or any Postgres) connection string
   - `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` — from a [GitHub OAuth app](https://github.com/settings/developers)
3. Create the database tables: run [`db/schema.sql`](db/schema.sql) against your `POSTGRES_URL`.
4. `pnpm dev` and open http://localhost:3000

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — lint with ESLint
