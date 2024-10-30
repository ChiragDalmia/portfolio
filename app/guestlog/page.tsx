import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";
import { unstable_noStore } from "next/cache";

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
