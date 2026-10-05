// =============================================================================
// SITE CONFIG — this is the only file you need to edit to make the site yours.
//
// Everything the site displays lives here: your name and bio, projects,
// experience, links, navigation, SEO/Open Graph copy, and page text. Nothing
// personal is hardcoded in the components — change a value here and it updates
// everywhere it's used.
//
// (Also replace the images at app/opengraph-image.jpg and app/favicon.ico, and
// fill in .env.local — see the README.)
// =============================================================================

// A run of prose that may contain inline links, used for the home-page bio.
// Plain strings render as normal text; { text, href } renders as a link.
// Put spaces INSIDE the strings so the output reads correctly, e.g.
//   ["I build ", { text: "cool things", href: "/projects" }, " for the web."]
export type RichText = (string | { text: string; href: string })[];

// A project shown on the home page and the projects page.
// `url` is where the title links to; `githubUrl` (optional) adds a "(Github)"
// source link — omit it, or set it equal to `url`, to hide the source link.
// `caseStudy` (optional) is a key of `caseStudies` below: the title then links
// to /projects/<key> and `url` becomes a small "(Live)" link.
// Keep `name` stable — like counts are stored against it.
export type Project = {
  name: string;
  url: string;
  githubUrl?: string;
  description: string;
  caseStudy?: string;
};

// One row in the Experience list. Only `linkText` is required. The line reads:
//   {prefix}{linkText}{suffix} (case study)          {dateRange}
//   {description}
//   • {highlights}
// `linkText` becomes a link when `url` is set, otherwise it's plain text.
// `caseStudy` (optional) is a key of `caseStudies` below.
export type ExperienceItem = {
  dateRange?: string;
  prefix?: string;
  linkText: string;
  suffix?: string;
  url?: string;
  description?: string;
  highlights?: string[];
  caseStudy?: string;
};

// A project write-up, served at /projects/<key> and listed in the sitemap.
// Only write what's true and checkable (repo, Devpost, your own notes) — and
// be clear about what teammates built.
export type CaseStudy = {
  name: string;
  metaTitle: string; // "| Your Name" is appended
  metaDescription: string;
  summary: string; // lead paragraph under the heading
  published: string; // YYYY-MM-DD the write-up went live
  updated: string; // YYYY-MM-DD of the last meaningful edit (sitemap + page)
  facts: [label: string, value: string][];
  links: { text: string; href: string }[];
  sections: { heading: string; paragraphs?: RichText[]; bullets?: string[] }[];
  stack: string[];
};

export const siteConfig = {
  // --- Who you are -----------------------------------------------------------
  author: {
    name: "Chirag Dalmia",
    role: "Frontend Developer",
    // Shown in the bio and the homepage's structured data (homeLocation).
    location: "Canada",
    // Your GitHub username. This person is the guestbook admin and can delete
    // any comment. Sign in to the guestbook with this GitHub account.
    githubUsername: "ChiragDalmia",
    // Current employer, added to the homepage's structured data (JSON-LD).
    worksFor: { name: "We Know Training", url: "https://wkt.ca/" },
    // Short bio and skills for the homepage's structured data (Person). Keep
    // them in line with what the page itself says.
    bio: "Frontend Developer in Canada building with Next.js, React and TypeScript, currently at We Know Training (WKT). Builds full stack side projects and organised HackCanada.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Angular",
      "Three.js",
      "Technical SEO",
    ],
    // Other profiles of yours that aren't in the footer. Added to the
    // structured data's sameAs alongside the footer's social links.
    otherProfiles: ["https://devpost.com/ChiragDalmia"],
  },

  // --- Your site -------------------------------------------------------------
  site: {
    // Production URL, no trailing slash. Used for canonical links, sitemap,
    // robots.txt and Open Graph metadata. Must match the host the site is
    // actually served from (Vercel 308-redirects the apex to www).
    url: "https://www.chiragdalmia.com",
  },

  // --- Search-engine / social-share metadata ---------------------------------
  seo: {
    // Title for the home page and social shares.
    title: "Chirag Dalmia | Frontend Developer Portfolio",
    // Template for pages without their own full title (e.g. the 404 page).
    titleTemplate: "%s | Chirag Dalmia",
    description:
      "Developer portfolio of Chirag Dalmia, a frontend developer in Canada building with Next.js, React and TypeScript. Projects, case studies and experience.",
    ogSiteName: "Chirag Dalmia",
    // Your X/Twitter handle, including the leading @.
    twitterHandle: "@dotchirag",
  },

  // --- Header navigation (also used to build the sitemap) --------------------
  nav: [
    { name: "home", href: "/" },
    { name: "projects", href: "/projects" },
    { name: "guestlog", href: "/guestlog" },
  ],

  // --- Footer social links ---------------------------------------------------
  social: [
    { name: "@dotchirag", url: "https://x.com/dotchirag" },
    { name: "github", url: "https://github.com/chiragdalmia" },
    { name: "linkedin", url: "https://www.linkedin.com/in/chiragdalmia007" },
  ],

  // --- Home page -------------------------------------------------------------
  home: {
    intro: {
      heading: "Hey, I'm Chirag Dalmia.",
      // Each entry is one paragraph. See the RichText note above for links.
      paragraphs: [
        [
          "I'm a Frontend Developer in Canada who loves building ",
          { text: "cool web stuff", href: "/projects" },
          ", mostly with Next.js, React and TypeScript. These days I'm at ",
          { text: "We Know Training (WKT)", href: "https://wkt.ca/" },
          ", working on the team's websites, from responsive UI and animation to analytics and technical SEO.",
        ],
        [
          "On my own projects I go full stack: Next.js or React up front, with Node, FastAPI, Postgres or MongoDB behind it, like the real-time ",
          { text: "FleetView", href: "/projects/fleetview" },
          " dashboard and the ",
          { text: "Photosynth-AI", href: "/projects/photosynthai" },
          " SaaS. Hackathons are where I get weird with AR in Three.js and AI APIs, and I helped build the ",
          { text: "HackCanada website", href: "/projects/hackcanada" },
          " as an organiser.",
        ],
        [
          "Outside work, I'm still obsessed with how large-scale companies design their infra, and always up for building, learning, and contributing to exciting projects.",
        ],
        [
          "Got a fun project in mind? Let's team up. You can find me on ",
          { text: "linkedin", href: "https://www.linkedin.com/in/chiragdalmia007" },
          " or drop a message in my ",
          { text: "guestbook", href: "/guestlog" },
          ".",
        ],
      ] as RichText[],
    },
    personalHeading: "Personal Projects",
    hackathonHeading: "Some of My Fav Hackathon Projects",
    allProjectsLabel: "All projects and case studies →",
    experienceHeading: "Experience",
    experience: [
      {
        dateRange: "Jul. 2026 - Present",
        prefix: "Frontend Developer at ",
        linkText: "We Know Training (WKT)",
        url: "https://wkt.ca/",
        description:
          "Currently working with the WKT team on frontend, animation, analytics and SEO across its family of websites.",
        highlights: [
          "Worked on WKT's Next.js website: responsive interfaces, product storytelling, animation and the Cloudflare launch.",
          "Contributed frontend improvements, content updates and technical SEO to the Relo and Business Career College sites.",
          "Worked on GA4/GTM event tracking and contact/newsletter form integrations, and created HTML/CSS/SVG explainer animations for ReadyEngine.",
        ],
      },
      {
        dateRange: "Sep. 2024 - Dec. 2024",
        prefix: "",
        linkText: "HackCanada",
        suffix: " Organiser (Front-end Dev)",
        url: "https://hackcanada.org/",
        caseStudy: "hackcanada",
        description:
          "Helped Organize one of Canada's largest student-run hackathons with designing website, logistics, and everything in between.",
      },
      {
        dateRange: "Mar. 2024 - Sep. 2024",
        prefix: "Web Dev Intern at ",
        linkText: "Sheridan College",
        suffix: "",
        url: "https://www.sheridancollege.ca/",
        description:
          "Building and maintaining web experiences for the college community.",
      },
    ] as ExperienceItem[],
  },

  // --- Projects page ---------------------------------------------------------
  projectsPage: {
    metaTitle: "Projects & Case Studies | Chirag Dalmia",
    metaDescription:
      "Full stack, AI and AR projects by Chirag Dalmia, with case studies on the problem, what he built and the stack: FleetView, Photosynth-AI, HackCanada and more.",
    heading: "Projects",
    intro: [
      "Things I've built, solo and with hackathon teams: full stack web apps, AI tools and a few AR experiments. Most names open a case study (the problem, what I built, the decisions and the stack); (Live) and (Github) jump straight to the demo and the code.",
    ] as RichText,
    personalHeading: "Personal Projects",
    hackathonHeading: "Hackathon Projects",
  },

  // --- Case study pages (/projects/<key>) ------------------------------------
  caseStudyPage: {
    stackHeading: "Stack",
    backLabel: "← All projects",
    updatedLabel: "Updated",
  },

  // --- Guestlog page metadata ------------------------------------------------
  guestlog: {
    metaTitle: "Guestlog",
    metaDescription:
      "Chirag Dalmia's guestbook. Sign in with GitHub, leave a comment and say hi.",
  },

  // --- Your projects (shown on both the home and projects pages) -------------
  projects: {
    personal: [
      {
        name: "FleetView",
        url: "https://fleetview.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/fleetview",
        caseStudy: "fleetview",
        description:
          "Real-time fleet dashboard tracking live TTC streetcars, with geofence and speeding alerts over WebSockets.",
      },
      {
        name: "CodeMentor AI",
        url: "https://codementor-ai.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/codementor-ai",
        caseStudy: "codementor-ai",
        description:
          "AI mentor that reviews your code: bugs, security, performance and a refactor.",
      },
      {
        name: "Portfolio v1.0",
        url: "https://v1.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/portfolio1.0",
        description: "My original portfolio design, kept alive as an archive.",
      },
      {
        name: "Photosynth-AI",
        url: "https://photosynthai.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/imageGenerator",
        caseStudy: "photosynthai",
        description:
          "AI-powered SaaS for quick image transformations, with credits and Stripe payments.",
      },
      {
        name: "Custom Auth",
        url: "https://github.com/ChiragDalmia/fullstack-customAuth",
        githubUrl: "https://github.com/ChiragDalmia/fullstack-customAuth",
        description:
          "Netflix-style full stack app with email/password and GitHub/Google sign-in (NextAuth, Prisma, MongoDB).",
      },
      {
        name: "DocIntelligence",
        caseStudy: "docintelligence",
        url: "https://docintelligence.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/docintelligence",
        description:
          "AI-powered document analysis and intelligence extraction tool.",
      },
      {
        name: "DataFlow Dashboard",
        caseStudy: "dataflow-dashboard",
        url: "https://dataflow-dashboard.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/dataflow-dashboard",
        description:
          "Real-time analytics dashboard in Angular and NgRx, running on a simulated metrics stream.",
      },
      {
        name: "PetRescue",
        url: "https://github.com/ChiragDalmia/petRescue",
        githubUrl: "https://github.com/ChiragDalmia/petRescue",
        description:
          "Group database project: SQL schema and Node scripts for a pet rescue's donations, volunteers and addresses.",
      },
    ],
    hackathon: [
      {
        name: "AnatomyAR",
        url: "https://anatomyar.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/anatomyAR",
        caseStudy: "anatomyar",
        description: "Teaching human anatomy through immersive AR.",
      },
      {
        name: "ScanTerra",
        url: "https://scanterra.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/scanterra",
        caseStudy: "scanterra",
        description:
          "Scan a barcode to evaluate a product's carbon footprint using AI.",
      },
      {
        name: "ARchatPet",
        url: "https://archatpet.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/archatpet",
        caseStudy: "archatpet",
        description:
          "Turn a photo of your pet into a 3D model and chat with it in AR.",
      },
      {
        name: "Quicture",
        url: "https://github.com/JasonLovesDoggo/quicture",
        githubUrl: "https://github.com/JasonLovesDoggo/quicture",
        caseStudy: "quicture",
        description:
          "Peer-to-peer image sharing platform on the go, that preserves quality.",
      },
      {
        name: "CanUDance",
        url: "https://devpost.com/software/canudance",
        githubUrl: "https://github.com/jamesjamcow/starterhacks",
        caseStudy: "canudance",
        description:
          "AI app that scores your dance moves from your camera feed in real time.",
      },
    ],
  } satisfies { personal: Project[]; hackathon: Project[] },

  // --- Case studies, served at /projects/<key> ---------------------------------
  // Keys are URL slugs. Several match the old v1 site's URLs on purpose, so
  // links and search results pointing at them still land on the write-up.
  caseStudies: {
    fleetview: {
      name: "FleetView",
      metaTitle: "FleetView: Real-Time Fleet Tracking Dashboard",
      metaDescription:
        "Case study: a real-time dashboard tracking live TTC streetcars, with geofence and speeding alerts over WebSockets. Built solo with React, FastAPI and MapLibre.",
      summary:
        "A real-time fleet monitoring dashboard: live TTC streetcar positions on a map, geofence and speeding alerts as they happen, and a panel per vehicle with telemetry and a camera feed.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Role", "Solo: design, frontend and backend"],
        ["Built", "June 2026"],
        ["Hosting", "Vercel (frontend), Render (backend)"],
      ],
      links: [
        { text: "Live demo", href: "https://fleetview.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/fleetview" },
      ],
      sections: [
        {
          heading: "Why I built it",
          paragraphs: [
            [
              "I got curious about how fleet-tracking companies follow vehicles and flag events in real time (",
              {
                text: "the backstory",
                href: "https://www.linkedin.com/posts/chiragdalmia007_today-i-got-curious-about-how-companies-like-ugcPost-7473171257904259072-kjkb/",
              },
              "), so I built a small one on real data. FleetView reads live vehicle positions from the TTC's public NextBus (umoiq) feed, which needs no API key.",
            ],
          ],
        },
        {
          heading: "How it works",
          bullets: [
            "A FastAPI backend polls the feed every 10 seconds, normalizes each vehicle and pushes the update to every connected browser over a WebSocket.",
            "Geofencing is a ray-casting point-in-polygon check against two zones, Downtown Core and Pearson Airport. The tracker remembers each vehicle's last inside/outside state, so it alerts once on entry or exit instead of on every tick.",
            "Speeding alerts fire above a configurable threshold (50 km/h by default). Tick rate, routes, vehicle cap and CORS are all environment variables.",
            "The feed is capped at 12 vehicles on streetcar routes 501, 504, 505, 506 and 510, which actually cross downtown, so geofence events fire for real.",
            "The React 19 frontend draws the map with MapLibre GL, lists vehicles as moving, idle or offline, and filters the alert log to the selected vehicle.",
          ],
        },
        {
          heading: "Decisions and trade-offs",
          bullets: [
            "No database. It's a live view, so vehicle state lives in memory and the alert log keeps the latest 50 entries.",
            "The backend accepts up to 50 WebSocket clients and closes extra connections with code 1013 (try again later); the client reconnects every 3 seconds.",
            "The camera feeds are placeholders. TTC vehicles don't expose dashcams, so each vehicle gets a stable public HLS test stream, played with HLS.js (native HLS on Safari).",
            "Map tiles default to OpenFreeMap so it runs without an account. A MapTiler key can be added in settings and stays in localStorage.",
          ],
        },
      ],
      stack: [
        "React 19 (React Compiler)",
        "TypeScript",
        "Vite",
        "Tailwind CSS 4",
        "MapLibre GL",
        "HLS.js",
        "FastAPI",
        "WebSockets",
        "httpx",
      ],
    },

    "codementor-ai": {
      name: "CodeMentor AI",
      metaTitle: "CodeMentor AI: AI Code Review App in Angular",
      metaDescription:
        "Case study: an AI code review tool built solo with Angular 21, RxJS and Gemini. Paste code, get bugs, security and performance findings plus a refactor.",
      summary:
        "Paste code and get a structured review back: bugs, security issues with CWE references, performance notes, an A–F grade and a refactored version in a side-by-side diff.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Role", "Solo: design and build"],
        ["Built", "June 2026"],
        ["Hosting", "Vercel"],
      ],
      links: [
        { text: "Live demo", href: "https://codementor-ai.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/codementor-ai" },
      ],
      sections: [
        {
          heading: "Why I built it",
          paragraphs: [
            [
              "Good code review is slow and senior engineers are busy, so a lot of code ships with blind spots nobody pointed out. I wanted that feedback loop in seconds, with no account to create.",
            ],
          ],
        },
        {
          heading: "How it works",
          bullets: [
            "Monaco, the editor behind VS Code, with seven languages. Each one loads a sample that has real problems to find.",
            "A Gemini service sends the code to Gemini 2.0 Flash and exposes the review as a state stream (idle, loading, complete or error) built on an RxJS BehaviorSubject, with switchMap so a new request cancels the one in flight.",
            "Results land in five tabs: Summary, Bugs, Performance, Security and Refactored Code, with severity badges and a GitHub-style diff of the refactor.",
            "Every review is saved to localStorage, and the dashboard's counts are computed with Angular Signals.",
          ],
        },
        {
          heading: "Decisions and trade-offs",
          bullets: [
            "No backend. You bring your own Gemini key and it stays in your browser; without one, a mock engine returns sample reviews so the app always works.",
            "Signals for synchronous UI state, RxJS for the async request flow.",
            "Plain SCSS with CSS custom properties instead of a UI framework, for full control over the design system.",
          ],
        },
        {
          heading: "What's next",
          paragraphs: [
            [
              "Streaming the review as Gemini writes it (right now the full response arrives at once), file upload, and reviewing GitHub pull requests directly.",
            ],
          ],
        },
      ],
      stack: [
        "Angular 21 (standalone)",
        "TypeScript",
        "RxJS",
        "Angular Signals",
        "Monaco Editor",
        "Gemini 2.0 Flash API",
        "SCSS",
      ],
    },

    photosynthai: {
      name: "Photosynth-AI",
      metaTitle: "Photosynth-AI: AI Image Editing SaaS in Next.js",
      metaDescription:
        "Case study: an AI image editing SaaS built solo with Next.js, Clerk, MongoDB, Stripe and Cloudinary: restore, generative fill, object removal and credits.",
      summary:
        "A full stack SaaS for AI image transformations: restore old photos, generative fill, remove objects or backgrounds and recolor, paid for with credits.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Role", "Solo: design, frontend and backend"],
        ["Built", "February 2024, upgraded to Next.js 16 in 2026"],
        ["Hosting", "Vercel"],
      ],
      links: [
        { text: "Live demo", href: "https://photosynthai.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/imageGenerator" },
      ],
      sections: [
        {
          heading: "What it does",
          paragraphs: [
            [
              "Sign in, upload an image, pick a transformation and get the result back from Cloudinary's AI. Each transformation costs one credit. The free plan comes with 20, and paid plans add more through Stripe.",
            ],
          ],
        },
        {
          heading: "How it works",
          bullets: [
            "Next.js App Router with server actions for images and transactions. Each action checks the Clerk session first.",
            "Credits are deducted atomically: the update only matches when the balance covers the cost, so two requests at once can't overspend.",
            "The image's owner is always set on the server, and zod strips any extra fields a client tries to slip in.",
            "Payments go through Stripe Checkout, and a webhook verified with Stripe's signature check adds the credits. Clerk user events arrive through a webhook verified with svix.",
            "Next.js 16's proxy runs Clerk's middleware, with only the landing page, sign-in pages and webhooks left public.",
          ],
        },
        {
          heading: "Testing",
          paragraphs: [
            [
              "Vitest covers checkout, image ownership, the Stripe webhook and transformation types, and GitHub Actions runs lint, type-checking, the tests and a production build.",
            ],
          ],
        },
      ],
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Clerk",
        "MongoDB + Mongoose",
        "Stripe",
        "Cloudinary",
        "zod",
        "Vitest",
      ],
    },

    hackcanada: {
      name: "HackCanada Website",
      metaTitle: "HackCanada Website: Astro, GSAP and SVG Animation",
      metaDescription:
        "How I helped build the 2024 HackCanada website as an organiser and front-end dev: Astro, React, GSAP and anime.js. Top contributor on the team repo.",
      summary:
        "The 2024 website for HackCanada, one of Canada's largest student-run hackathons. I joined the organising team as a front-end developer and was the most active contributor on the site.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Role", "Organiser and front-end developer"],
        ["Built", "August to November 2024"],
        ["Team", "HackCanada organising team"],
        ["Contribution", "Top contributor: 263 of the repo's 426 commits (October 2026)"],
      ],
      links: [
        { text: "hackcanada.org", href: "https://hackcanada.org/" },
        {
          text: "Source on GitHub",
          href: "https://github.com/Hackathons-North-America/HackCanada",
        },
      ],
      sections: [
        {
          heading: "The goal",
          paragraphs: [
            [
              "A site that feels alive but stays fast and easy to maintain: one place for hackers, organisers and sponsors, modular enough to reuse for future events.",
            ],
          ],
        },
        {
          heading: "What I built",
          bullets: [
            "The groundwork: a skeleton for every section, Lenis smooth scrolling, shared GSAP helpers, metadata and SEO, plus ESLint and Husky pre-commit hooks for the team.",
            "The winter hero: snowfall, a sledge animation, an aurora and SVG hills.",
            "The teams section: an infinite marquee that pauses on hover, flag and tooltip animations, and cards ported from Astro to React with GSAP.",
            "The sponsors section: an SVG path morph with anime.js, sponsor cards and a bee animation.",
            "An About section rendered from markdown in the site config, FAQ updates, the OG image and the newsletter sign-up.",
          ],
        },
        {
          heading: "Keeping it fast",
          bullets: [
            "Astro's islands ship static HTML and only hydrate the interactive React parts.",
            "I swapped icon and 3D dependencies (Radix icons, Spline) for a small custom SVG icon set, removed unused files and packages, and made the animations cheaper to run.",
            "Images go through Astro's image pipeline with sharp, and fonts are preloaded.",
          ],
        },
        {
          heading: "Team and today",
          paragraphs: [
            [
              "This was a team build: other organisers contributed sections, fixes and content. The live hackcanada.org has since been redesigned for later events, so it no longer shows the 2024 version described here.",
            ],
          ],
        },
      ],
      stack: [
        "Astro 4",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
        "anime.js",
        "Lenis",
        "nanostores",
      ],
    },

    quicture: {
      name: "Quicture",
      metaTitle: "Quicture: Lossless P2P Photo Sharing (GDSC Hacks)",
      metaDescription:
        "GDSC Hacks 2024 case study: peer-to-peer photo sharing that keeps images lossless. I built the Next.js frontend; teammates built the P2P layer and backend.",
      summary:
        "A fast, anonymous photo-sharing app: join a room and share images peer to peer, so they arrive at full quality instead of being compressed into oblivion.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Event", "GDSC Hacks 2024"],
        ["Built", "May 2024"],
        ["Role", "Frontend developer"],
        ["Team", "Jason Cameron, Joudat Haroon, she11fish and me"],
      ],
      links: [
        { text: "Source on GitHub", href: "https://github.com/JasonLovesDoggo/quicture" },
        { text: "Devpost", href: "https://devpost.com/software/lossn-t" },
      ],
      sections: [
        {
          heading: "The problem",
          paragraphs: [
            [
              "You take a great photo, share it, and it comes out compressed. We wanted lossless sharing without paying for heavy server transfers, so images go straight between devices, with optional cloud storage that deletes them after 7 days.",
            ],
          ],
        },
        {
          heading: "What I built",
          paragraphs: [
            [
              "I owned the Next.js frontend. The first challenge was the room system: it should feel like stepping into a shared gallery with friends.",
            ],
          ],
          bullets: [
            "The landing page and dynamic /room/[id] routes.",
            "The room view: a parallax image carousel, picking images with checkboxes, and downloading them.",
            "Toast notifications, fade-in motion, and responsive and dark-mode fixes.",
            "Hooking the room UI up to the socket connection, the part that nearly sent my laptop flying.",
          ],
        },
        {
          heading: "Team",
          paragraphs: [
            [
              "Jason built the FastAPI backend on Google Cloud and worked on the P2P side, and Joudat built the P2P client and its Express backend. We didn't win the top prize, but seeing the first full-quality image land in a room at 3 AM made the weekend.",
            ],
          ],
        },
      ],
      stack: [
        "Next.js 14",
        "Socket.IO",
        "simple-peer (WebRTC)",
        "react-dropzone",
        "Framer Motion",
        "shadcn/ui",
        "FastAPI",
        "Google Cloud Storage",
      ],
    },

    canudance: {
      name: "CanUDance",
      metaTitle: "CanUDance: AI Dance Scoring App (StarterHacks)",
      metaDescription:
        "StarterHacks 2024 case study: mirror a 3D dance instructor on camera and get scored by AI. I designed and built the Next.js frontend with a Spline 3D model.",
      summary:
        "Pick a dance, mirror a 3D instructor on camera, and get a score out of 10 with feedback. Then grab a shareable photo of your best move.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Event", "StarterHacks 2024"],
        ["Built", "July 2024"],
        ["Role", "Frontend developer and UX"],
        ["Team", "Tom Zhang, James Cao and me"],
      ],
      links: [
        { text: "Devpost", href: "https://devpost.com/software/canudance" },
        { text: "Source on GitHub", href: "https://github.com/jamesjamcow/starterhacks" },
      ],
      sections: [
        {
          heading: "The idea",
          paragraphs: [
            [
              "Dance challenges are all over reels (guilty). We wanted to make one that actually tells you how you did, in real time.",
            ],
          ],
        },
        {
          heading: "What I built",
          paragraphs: [
            [
              "I sketched the wireframes for the whole flow, from picking a dance to the final score, then built the Next.js frontend:",
            ],
          ],
          bullets: [
            "The Spline 3D instructor and the webcam view, so you dance side by side with the model.",
            "Screenshot capture during the dance, sent to the backend for scoring.",
            "The dance flow, the results screen and the Instagram-style photo of your best move.",
            "Animations and last-minute bug squashing, plus a few backend fixes to get the Gemini scoring working.",
          ],
        },
        {
          heading: "Team",
          paragraphs: [
            [
              "My teammates built the Django backend, the image upload and snapshot endpoints, and the Gemini prompt that turns those snapshots into a score. We didn't win the top prize, but watching people try it at demo time made it worth it.",
            ],
          ],
        },
      ],
      stack: [
        "Next.js 14",
        "Spline",
        "react-webcam",
        "html2canvas",
        "GSAP",
        "Framer Motion",
        "Django REST Framework",
        "Gemini API",
      ],
    },

    scanterra: {
      name: "ScanTerra",
      metaTitle: "ScanTerra: Barcode Carbon Footprint Scanner",
      metaDescription:
        "TerraHacks 2024 case study: scan a product barcode and get an AI eco score out of 100. I built the scanner, API routes and landing page in Next.js.",
      summary:
        "Scan a product's barcode and get an eco score out of 100 with a one-line reason, so you're not guessing how sustainable it is.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Event", "TerraHacks 2024"],
        ["Built", "August 2024"],
        ["Role", "Full stack (scanner, API routes, landing page)"],
        ["Team", "Leo Cheng, Kevin Huang and me"],
      ],
      links: [
        { text: "Live demo", href: "https://scanterra.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/scanterra" },
        { text: "Devpost", href: "https://devpost.com/software/scanterra" },
      ],
      sections: [
        {
          heading: "How it works",
          bullets: [
            "The camera reads the barcode in the browser with react-zxing.",
            "A Next.js API route looks the product up with the Barcode Lookup API and drops empty fields.",
            "A second route sends the product details to Claude (Anthropic's API) and asks for JSON back: a score out of 100 and a short reason.",
            "The result shows in a card with a circular score bar.",
          ],
        },
        {
          heading: "What I built",
          bullets: [
            "Project setup with shadcn/ui and the barcode scanner component.",
            "The first versions of both API routes (product lookup and scoring), with the API keys in environment variables.",
            "The landing page (hero with a Spline 3D model, features and call to action), the loader, the scan button and the result card.",
          ],
        },
        {
          heading: "Team",
          paragraphs: [
            [
              "Leo built the scan logic, local history with localStorage, the circular score bar and the CO2 graphic, and reworked the APIs with me.",
            ],
          ],
        },
      ],
      stack: [
        "Next.js 14",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "react-zxing",
        "Anthropic API (Claude)",
        "Barcode Lookup API",
        "Framer Motion",
        "Spline",
      ],
    },

    archatpet: {
      name: "ARchatPet",
      metaTitle: "ARchatPet (PortaPet): Talk to Your Pet in AR",
      metaDescription:
        "Hack the Valley 9 case study: turn a pet photo into a 3D model you can talk to in AR. I built the image-to-3D pipeline and the AR scene (React Three Fiber).",
      summary:
        "Upload a photo of your pet and it comes back as a 3D model in augmented reality. Say its name and you can talk to it, and it answers in its own voice.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Event", "Hack the Valley 9 (as PortaPet)"],
        ["Built", "October 2024"],
        ["Role", "Image-to-3D pipeline and AR"],
        ["Team", "Krishna Cheemalapati, Edward D and me"],
      ],
      links: [
        { text: "Live demo", href: "https://archatpet.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/archatpet" },
        { text: "Devpost", href: "https://devpost.com/software/portapet" },
      ],
      sections: [
        {
          heading: "The idea",
          paragraphs: [
            [
              "It started as a homesick coder's dream: moving away and missing your pet, and wondering if you could bring them along, virtually.",
            ],
          ],
        },
        {
          heading: "What I built",
          bullets: [
            "The image-to-3D pipeline: an API route sends the photo to Meshy's image-to-3D model, polls the task, and when it succeeds copies the .glb model into Vercel Blob so it loads from our own storage.",
            "A proxy route for fetching models, and the split between server and client code.",
            "The AR scene in React Three Fiber and WebXR: placing the pet, physics, and hooking up the voice conversation.",
            "Per-pet routes (/scene/[name]), the audio manager, deployment fixes, and later a GSAP and Lenis restyle of the landing page.",
          ],
        },
        {
          heading: "Team",
          paragraphs: [
            [
              "Krishna integrated ElevenLabs for the pet's voice, Edward built the first landing page, and another contributor built the audio recording component. The AI replies run on Cloudflare.",
            ],
          ],
        },
      ],
      stack: [
        "Next.js 14",
        "React Three Fiber",
        "@react-three/xr",
        "Three.js",
        "Meshy API",
        "Vercel Blob",
        "ElevenLabs",
        "Cloudflare",
        "GSAP",
      ],
    },

    anatomyar: {
      name: "AnatomyAR",
      metaTitle: "AnatomyAR: Real-Time AR Anatomy with Three.js",
      metaDescription:
        "CTRL+HACK+DEL case study: AR anatomy models tracked onto your body through a phone camera. I set up the Vite, React and Geenee pose-tracking frontend.",
      summary:
        "Point your phone camera at someone and see their heart, lungs, intestines or skeleton tracked onto their body in real time. Anatomy on a real body instead of a flat diagram.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Event", "CTRL+HACK+DEL"],
        ["Built", "November 2024"],
        ["Role", "Front-end development"],
        ["Team", "Amr Radwan, Arianne Ghislaine Rull and me"],
      ],
      links: [
        { text: "Live demo", href: "https://anatomyar.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/anatomyAR" },
        { text: "Devpost", href: "https://devpost.com/software/anatomar" },
      ],
      sections: [
        {
          heading: "The idea",
          paragraphs: [
            [
              "Anatomy is hard to learn from textbook illustrations, and models and labs aren't available everywhere. AnatomyAR puts 3D organs on a real body using just a phone, and lets teachers record a lesson.",
            ],
          ],
        },
        {
          heading: "What I built",
          bullets: [
            "Moved the project from Next.js to Vite with Geenee's body-tracking SDK and Three.js renderer, then restructured it in React.",
            "The model viewer: a map of heart, lungs, intestines and skeleton models, each with occluders so the body hides the parts that should be behind it.",
            "The model carousel, camera switch, record button and loading screen.",
            "Moved the SDK token into environment variables, with separate dev and production tokens.",
          ],
        },
        {
          heading: "Team",
          paragraphs: [
            [
              "Amr added the lungs and intestines models, fixed their placement and handled deployment, and Arianne built the landing page.",
            ],
          ],
        },
      ],
      stack: ["React", "TypeScript", "Vite", "Three.js", "Geenee body tracking", "Blender"],
    },
    docintelligence: {
      name: "DocIntelligence",
      metaTitle: "DocIntelligence: AI Document Extraction and Chat",
      metaDescription:
        "Case study: upload a PDF or text file, extract names, dates and amounts with Groq's Llama 3, then chat with the document. Built solo with Angular and Express.",
      summary:
        "Upload a PDF or text file and get its key details pulled out (name, date, amount and entities), highlighted in the text, then ask questions about it in a chat.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Role", "Solo: design, frontend and backend"],
        ["Built", "June 2026"],
        ["Hosting", "Vercel (frontend), Render (backend)"],
      ],
      links: [
        { text: "Live demo", href: "https://docintelligence.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/docintelligence" },
      ],
      sections: [
        {
          heading: "Why I built it",
          paragraphs: [
            [
              "I wanted to see how far an LLM could take the boring part out of reading contracts, invoices and reports just to find a few specific details.",
            ],
          ],
        },
        {
          heading: "How it works",
          bullets: [
            "Uploads return straight away and processing runs in the background. The UI polls the document and shows each step: parse, extract, embed, ready.",
            "pdf-parse reads PDFs. Groq's Llama 3 8B then extracts the name, date, amount, entities and any other useful fields as JSON, at temperature 0 so results stay consistent.",
            "With no Groq key, or if the call fails, a regex extractor finds the name, date, amount, invoice number, email and phone, so a document never gets stuck.",
            "The viewer highlights every extracted value in the text, and clicking a field scrolls to it.",
            "Chat sends the extracted fields, the start of the document and the last 10 messages, and the prompt tells the model to answer only from the document.",
            "A dashboard charts file types and processing status with Chart.js and lists the top keywords.",
          ],
        },
        {
          heading: "Decisions and trade-offs",
          bullets: [
            "Angular standalone components, all with OnPush change detection, and every route lazy-loaded.",
            "Search uses a small 128-dimension vector hashed from words and word pairs, compared with cosine similarity. It's cheap and deterministic, but closer to keyword matching than true semantic embeddings, and for now it's only exposed through the API.",
            "Documents are kept in memory and saved to a JSON file on shutdown. Fine for a demo, not a database.",
            "Uploads are limited to .pdf and .txt files up to 10 MB.",
          ],
        },
        {
          heading: "Testing and deployment",
          paragraphs: [
            [
              "73 Jest and Supertest tests cover the backend, with an 80% line-coverage threshold, and 54 Karma tests cover the frontend. A GitHub Actions workflow runs both, builds the app, and deploys the frontend to Vercel and the backend to Render. Dockerfiles run the server as a non-root user and serve the frontend from nginx.",
            ],
          ],
        },
      ],
      stack: [
        "Angular 17",
        "TypeScript",
        "Chart.js",
        "Node.js",
        "Express",
        "pdf-parse",
        "Groq (Llama 3 8B)",
        "Jest",
        "Docker",
        "GitHub Actions",
      ],
    },

    "dataflow-dashboard": {
      name: "DataFlow Dashboard",
      metaTitle: "DataFlow: Real-Time Angular and NgRx Dashboard",
      metaDescription:
        "Case study: a real-time analytics dashboard with 15 Chart.js charts fed by a simulated stream. Built solo with Angular 18, NgRx and RxJS.",
      summary:
        "A real-time analytics dashboard: a simulated market data stream ticks every second into 15 charts and four KPI cards, and snapshots let you look back at earlier moments.",
      published: "2026-10-05",
      updated: "2026-10-05",
      facts: [
        ["Role", "Solo"],
        ["Built", "June 2026"],
        ["Hosting", "Vercel"],
      ],
      links: [
        { text: "Live demo", href: "https://dataflow-dashboard.chiragdalmia.com/" },
        { text: "Source on GitHub", href: "https://github.com/ChiragDalmia/dataflow-dashboard" },
      ],
      sections: [
        {
          heading: "What it does",
          paragraphs: [
            [
              "Hit Start Stream and a new price, volume and volatility reading arrives every second. Seven line charts, five bar charts and three pie charts update together, next to KPI cards for active streams, data rate, volatility and latency. The data is simulated (a random-walk price), so the focus is on how the front end handles a constant stream. Every 10 seconds a snapshot is saved, and the History page keeps the last 20 in localStorage.",
            ],
          ],
        },
        {
          heading: "How it works",
          bullets: [
            "A stream service switches between a one-second interval and an empty stream with switchMap, and shares one subscription with shareReplay.",
            "An NgRx store keeps the last 100 readings. Effects start the stream until a stop action arrives, and save a throttled snapshot every 10 seconds.",
            "23 memoized selectors work out the chart data from the latest 60 points: moving average, price change, and volume and volatility buckets.",
          ],
        },
        {
          heading: "Keeping it fast",
          bullets: [
            "All 13 components use OnPush change detection, so only components whose inputs changed are checked.",
            "Charts swap their data in place and call Chart.js update('none') with animation off, instead of being rebuilt every second.",
            "The Dashboard and History pages are lazy-loaded routes.",
          ],
        },
        {
          heading: "Testing",
          paragraphs: [
            [
              "101 Jasmine and Karma tests cover the stream service, the reducer, the selectors, the KPI card and the three chart components.",
            ],
          ],
        },
      ],
      stack: ["Angular 18", "TypeScript", "NgRx (store, effects)", "RxJS", "Chart.js 4", "Jasmine", "Karma"],
    },
  } satisfies Record<string, CaseStudy>,

  // --- Guestbook UI text -----------------------------------------------------
  guestbook: {
    commentsHeading: "Comments",
    emptyState: "No comments yet — be the first to say hi!",
    inputPlaceholder: "Enter your comment...",
    postLabel: "Post",
    postingLabel: "Posting...",
    signInLabel: "Sign in",
    signOutLabel: "Sign out",
  },

  // --- Error page (shown when a page fails to load) --------------------------
  errorPage: {
    heading: "Something went wrong",
    body: "An unexpected error occurred while loading this page. It's probably temporary.",
    retryLabel: "Try again",
  },

  // --- 404 page --------------------------------------------------------------
  notFound: {
    heading: "Page not found",
    body: "The page you're looking for doesn't exist (or moved).",
    backLabel: "Back to Home",
  },
} as const;
