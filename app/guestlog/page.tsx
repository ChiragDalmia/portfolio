import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";
import { unstable_noStore } from "next/cache";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.guestlog.metaTitle,
  description: siteConfig.guestlog.metaDescription,
};

export default async function Page() {
  // Opt out of static rendering
  unstable_noStore();

  return (
    <section className="relative">
      <AuthStatus />
      <CommentSection />
    </section>
  );
}
