import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { Providers } from "@/components/providers";
// import NoiseBackground from "@/components/NoiseBackground";

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
      className={`${inter.className} [scrollbar-gutter:stable] antialiased tracking-tight`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}})()` }} />
      </head>
      <body className="min-h-[100vh] flex flex-col">
        <div className="flex-grow flex flex-col p-4">
          <header className="max-w-[70ch] mx-auto w-full relative flex items-center justify-between">
            <nav aria-label="Main navigation">
              <ul className="flex gap-4 text-sm list-none m-0 p-0">
                <li className="m-0"><Link href="/">home</Link></li>
                <li className="m-0"><Link href="/projects">projects</Link></li>
                <li className="m-0"><Link href="/guestlog">guestlog</Link></li>
              </ul>
            </nav>
            <ThemeToggle />
          </header>
          <main className="max-w-[70ch] mx-auto w-full space-y-6 flex-grow pt-4 md:pt-8">
            <Providers>{children}</Providers>
          </main>
        </div>
        <Footer />
        <Analytics />
        {/* <NoiseBackground /> */}
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: "@dotchirag", url: "https://x.com/dotchirag" },
    { name: "github", url: "https://github.com/chiragdalmia" },
    { name: "linkedin", url: "https://www.linkedin.com/in/chiragdalmia007" },
  ];

  return (
    <footer className="mt-auto py-4">
      <div className="flex justify-center items-center max-w-[70ch] mx-auto text-sm text-gray-500 dark:text-gray-400">
       
        <nav aria-label="Social media links">
          <ul className="flex space-x-4">


            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  <span className="sr-only">Chirag Dalmia on {link.name}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
