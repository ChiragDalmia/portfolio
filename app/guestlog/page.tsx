import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";
import { unstable_noStore } from "next/cache";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${siteConfig.guestlog.metaTitle} | ${siteConfig.author.name}`,
  description: siteConfig.guestlog.metaDescription,
  path: "/guestlog",
});

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
