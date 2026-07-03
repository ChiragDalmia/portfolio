import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

// The canonical URL is set per page (see app/page.tsx); putting it here
// would mark every page as a duplicate of the homepage.
export const metadata: Metadata = {
  metadataBase: new URL("https://chiragdalmia.com"),
  title: {
    default: "Chirag Dalmia | Full Stack Developer",
    template: "%s | Chirag Dalmia",
  },
  description:
    "Portfolio of Chirag Dalmia, a Full Stack Developer specializing in modern web technologies.",
  // og:image comes from the app/opengraph-image.png file convention.
  openGraph: {
    siteName: "Chirag Dalmia",
    url: "https://chiragdalmia.com",
    type: "website",
    title: "Chirag Dalmia | Full Stack Developer",
    description:
      "Portfolio of Chirag Dalmia, a Full Stack Developer specializing in modern web technologies.",
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
      suppressHydrationWarning
      className={`${inter.className} scrollbar-gutter-stable antialiased tracking-tight`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <div className="grow flex flex-col p-4">
            <header className="max-w-[70ch] mx-auto w-full relative flex items-center justify-between">
              <nav aria-label="Main navigation">
                <ul className="flex gap-4 text-sm list-none m-0 p-0">
                  <li className="m-0">
                    <Link href="/">home</Link>
                  </li>
                  <li className="m-0">
                    <Link href="/projects">projects</Link>
                  </li>
                  <li className="m-0">
                    <Link href="/guestlog">guestlog</Link>
                  </li>
                </ul>
              </nav>
              <ThemeToggle />
            </header>
            <main className="max-w-[70ch] mx-auto w-full space-y-6 grow pt-4 md:pt-8">
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
