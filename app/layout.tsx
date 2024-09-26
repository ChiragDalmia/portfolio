import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chiragdalmia.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Chirag Dalmia | Front-end Developer",
    template: "%s | Chirag Dalmia",
  },
  description:
    "Portfolio of Chirag Dalmia, a Front-end Developer specializing in modern web technologies.",
  openGraph: {
    siteName: "Chirag Dalmia",
    url: "https://chiragdalmia.com",
    type: "website",
    title: "Chirag Dalmia | Front-end Developer",
    description:
      "Portfolio of Chirag Dalmia, a Front-end Developer specializing in modern web technologies.",
    images: [
      {
        url: "https://chiragdalmia.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chirag Dalmia - Front-end Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dotchirag",
    creator: "@dotchirag",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} [scrollbar-gutter:stable] dark antialiased tracking-tight`}
    >
      <body className="min-h-[100svh] flex flex-col">
        <div className="flex-grow flex flex-col p-4">
          <header className="max-w-[70ch] mx-auto w-full relative">
            <ThemeToggle />
          </header>
          <main className="max-w-[70ch] mx-auto w-full space-y-6 flex-grow pt-4 md:pt-8">
            <Providers>{children}</Providers>
          </main>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: "@dotchirag", url: "https://x.com/dotchirag" },
    { name: "linkedin", url: "https://www.linkedin.com/in/chiragdalmia007" },
    { name: "github", url: "https://github.com/chiragdalmia" },
  ];

  return (
    <footer className="mt-auto py-6 text-center">
      <nav aria-label="Social media links">
        <ul className="flex justify-center items-end space-x-4 tracking-tight">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <span className="sr-only">Chirag Dalmia on </span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-3 text-xs text-gray-400">
        Portfolio Inspired By{" "}
        <Link
          href="https://leerob.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lee Rob
        </Link>
      </div>
    </footer>
  );
}
