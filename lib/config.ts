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
export type Project = {
  name: string;
  url: string;
  githubUrl?: string;
  description: string;
};

// One row in the Experience list. Only `linkText` is required. The line reads:
//   {prefix}{linkText}{suffix}          {dateRange}
//   {description}
// `linkText` becomes a link when `url` is set, otherwise it's plain text.
export type ExperienceItem = {
  dateRange?: string;
  prefix?: string;
  linkText: string;
  suffix?: string;
  url?: string;
  description?: string;
};

export const siteConfig = {
  // --- Who you are -----------------------------------------------------------
  author: {
    name: "Chirag Dalmia",
    role: "Full Stack Developer",
    // Your GitHub username. This person is the guestbook admin and can delete
    // any comment. Sign in to the guestbook with this GitHub account.
    githubUsername: "ChiragDalmia",
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
    title: "Chirag Dalmia | Full Stack Developer",
    // Template for other pages; %s is replaced by that page's title.
    titleTemplate: "%s | Chirag Dalmia",
    description:
      "Portfolio of Chirag Dalmia, a Full Stack Developer specializing in modern web technologies.",
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
      heading: "Hey, I'm Chirag.",
      // Each entry is one paragraph. See the RichText note above for links.
      paragraphs: [
        [
          "I'm a Full Stack Developer who loves building ",
          { text: "cool web stuff", href: "/projects" },
          ". Lately, I've been obsessed with learning how large-scale companies design their infra. I'm always looking for opportunities to build, learn, and contribute to exciting projects.",
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
    experienceHeading: "Experience",
    experience: [
      {
        dateRange: "Feb. 2025 - Mar. 2026",
        prefix: "Fullstack Dev at ",
        linkText: "Academy Petroleum Industries",
        suffix: "",
        url: "https://www.academypetroleum.com/",
        description:
          "Developing full stack solutions to streamline operations and internal tooling.",
      },
      {
        dateRange: "Sep. 2024 - Dec. 2024",
        prefix: "",
        linkText: "HackCanada",
        suffix: " Organiser (Front-end Dev)",
        url: "https://hackcanada.org/",
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
    metaTitle: "Projects",
    metaDescription:
      "Personal and hackathon projects built by Chirag Dalmia — full stack web apps, AI tools, and AR experiments.",
    heading: "Projects",
    personalHeading: "Personal Projects",
    hackathonHeading: "Hackathon Projects",
  },

  // --- Guestlog page metadata ------------------------------------------------
  guestlog: {
    metaTitle: "Guestlog",
    metaDescription: "Sign the guestbook — leave a comment and say hi.",
  },

  // --- Your projects (shown on both the home and projects pages) -------------
  projects: {
    personal: [
      {
        name: "FleetView",
        url: "https://fleetview.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/fleetview",
        description:
          "Fleet management dashboard for tracking vehicles, drivers, and logistics in real time.",
      },
      {
        name: "CodeMentor AI",
        url: "https://codementor-ai.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/codementor-ai",
        description: "AI mentor that reviews your code and guides you.",
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
        description: "AI-powered SaaS for quick image transformations.",
      },
      {
        name: "Custom Auth",
        url: "https://github.com/ChiragDalmia/fullstack-customAuth",
        githubUrl: "https://github.com/ChiragDalmia/fullstack-customAuth",
        description:
          "Custom-built full-stack authentication system from scratch.",
      },
    ],
    hackathon: [
      {
        name: "AnatomyAR",
        url: "https://anatomyar.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/anatomyAR",
        description: "Teaching human anatomy through immersive AR.",
      },
      {
        name: "ScanTerra",
        url: "https://scanterra.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/scanterra",
        description:
          "Scan a barcode to evaluate a product's carbon footprint using AI.",
      },
      {
        name: "ARchatPet",
        url: "https://archatpet.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/archatpet",
        description:
          "Turn a photo of your pet into a 3D model and chat with it in AR.",
      },
      {
        name: "DataFlow Dashboard",
        url: "https://dataflow-dashboard.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/dataflow-dashboard",
        description:
          "Dashboard for visualizing and monitoring data pipeline flows.",
      },
      {
        name: "DocIntelligence",
        url: "https://docintelligence.chiragdalmia.com/",
        githubUrl: "https://github.com/ChiragDalmia/docintelligence",
        description:
          "AI-powered document analysis and intelligence extraction tool.",
      },
      {
        name: "PetRescue",
        url: "https://github.com/ChiragDalmia/petRescue",
        githubUrl: "https://github.com/ChiragDalmia/petRescue",
        description: "Platform connecting rescued pets with potential adopters.",
      },
      {
        name: "Quicture",
        url: "https://github.com/JasonLovesDoggo/quicture",
        githubUrl: "https://github.com/JasonLovesDoggo/quicture",
        description:
          "Peer-to-peer image sharing platform on the go, that preserves quality",
      },
      {
        name: "CanUDance",
        url: "https://devpost.com/software/canudance",
        githubUrl: "https://github.com/jamesjamcow/starterhacks",
        description:
          "AI app that scores your dance moves from your camera feed in real time.",
      },
    ],
  } satisfies { personal: Project[]; hackathon: Project[] },

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
