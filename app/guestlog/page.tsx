import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";
import { unstable_noStore } from "next/cache";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.guestlog.metaTitle,
  description: siteConfig.guestlog.metaDescription,
  alternates: {
    canonical: "/guestlog",
  },
};

export default async function Page() {
  // Opt out of static rendering
  unstable_noStore();

  return (
    <section className="relative">
      {/* Visually hidden: gives the page an h1 (the visible content starts at
          the "Comments" h2) without changing the layout. */}
      <h1 className="sr-only">{siteConfig.guestlog.metaTitle}</h1>
      <AuthStatus />
      <CommentSection />
    </section>
  );
}
