import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";
import { unstable_noStore } from "next/cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestlog",
  description: "Sign the guestbook — leave a comment and say hi.",
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
