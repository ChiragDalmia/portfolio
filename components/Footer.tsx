"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LikeButton from "@/components/LikeButton";

const links = [
  { name: "@dotchirag", url: "https://x.com/dotchirag" },
  { name: "github", url: "https://github.com/chiragdalmia" },
  { name: "linkedin", url: "https://www.linkedin.com/in/chiragdalmia007" },
];

export default function Footer() {
  const pathname = usePathname();
  const { status } = useSession();
  // The guestlog's fixed comment input owns the bottom of the viewport.
  if (pathname.startsWith("/guestlog") && status !== "unauthenticated") {
    return null;
  }

  return (
    <footer className="mt-auto py-4 px-4">
      <div className="relative flex justify-center items-center max-w-[70ch] mx-auto text-sm text-gray-600 dark:text-gray-400">
        <nav aria-label="Social media links">
          <ul className="flex gap-4 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.name} className="m-0">
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
        <LikeButton slug="site" className="absolute right-0" />
      </div>
    </footer>
  );
}
