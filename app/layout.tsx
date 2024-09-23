import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { Providers } from "@/components/providers";
import ThemeToggle from "@/components/ThemeToggle";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chiragdalmia.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Chirag Dalmia",
    template: "%s | Chirag Dalmia",
  },
  description:
    "Front-end Developer | Crafting clean, efficient, and impactful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} [scrollbar-gutter:stable] dark`}>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-4">
          <main className="pt-12 max-w-[60ch] mx-auto w-full space-y-6">
            <ThemeToggle />
            <Providers>{children}</Providers>
          </main>
          <Footer />
          <Analytics />
        </div>
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
    <footer className="mt-12 text-center">
      <div className="flex justify-center items-end space-x-4 tracking-tight">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-400">
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
