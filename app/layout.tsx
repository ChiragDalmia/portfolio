import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Chirag Dalmia",
    template: "%s | My Portfolio",
  },
  description: "A showcase of my work and skills as a Front-end developer",
  keywords: [
    "portfolio",
    "web development",
    "react",
    "next.js",
    "frontend developer",
  ],
  authors: [{ name: "Chirag Dalmia" }],
  creator: "Chirag Dalmia",
  publisher: "Chirag Dalmia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portfolio-zeta-ten-70.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chirag Dalmia",
    description: "A showcase of my work and skills as a web developer",
    url: "https://portfolio-zeta-ten-70.vercel.app",
    siteName: "My Portfolio",
    images: [
      {
        url: "https://portfolio-zeta-ten-70.vercel.app/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Chirag Dalmia's Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirag Dalmia | My Portfolio",
    description: "A showcase of my work and skills as a web developer",
    images: [
      {
        url: "https://portfolio-zeta-ten-70.vercel.app/images/twitter-banner.png",
        width: 1200,
        height: 600,
        alt: "Chirag Dalmia's Portfolio",
      },
    ],
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
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://portfolio-zeta-ten-70.vercel.app" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
