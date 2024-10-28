import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";

export default async function Page() {
  return (
    <section className="relative">
      <AuthStatus />
      <CommentSection />
    </section>
  );
}
