import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

// The canonical URL is set per page (see app/page.tsx); putting it here
// would mark every page as a duplicate of the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: {
    default: siteConfig.seo.title,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  // og:image comes from the app/opengraph-image.png file convention.
  openGraph: {
    siteName: siteConfig.seo.ogSiteName,
    url: siteConfig.site.url,
    type: "website",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
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
                  {siteConfig.nav.map((item) => (
                    <li key={item.href} className="m-0">
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  ))}
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
