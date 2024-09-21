import type { Metadata } from "next";

const siteUrl = "https://portfolio-zeta-ten-70.vercel.app";

export const siteConfig = {
  name: "Chirag Dalmia",
  description:
    "Front-end Developer | Crafting clean, efficient, and impactful digital experiences.",
  url: siteUrl,
  ogImage: `${siteUrl}/images/banner.png`,
  twitterImage: `${siteUrl}/images/banner.png`,
  links: {
    twitter: "https://twitter.com/chiragdalmia007",
  },
};

export const metadataConfig: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Chirag Dalmia",
    "Front-end developer",
    "web development portfolio",
    "React developer",
    "Next.js expert",
    "JavaScript developer",
    "responsive web design",
    "UI/UX design",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "web performance optimization",
    "SEO best practices",
    "single-page applications",
    "progressive web apps",
    "JavaScript frameworks",
    "modern web technologies",
    "cross-browser compatibility",
    "Git and version control",
    "freelance front-end developer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}'s Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.twitterImage],
    creator: "@chiragdalmia007",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};
