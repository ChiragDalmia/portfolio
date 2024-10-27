import { auth } from "@/lib/auth";
import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/CommentSection";

export default async function Page() {
  const session = await auth();

  return (
    <section >
      <h1 >Guest Log</h1>
      {session?.user ? (
        <p>
          Hey {session.user.name}, leave a comment here!
        </p>
      ) : (
        <p>Sign in with GitHub to leave a comment.</p>
      )}
      <CommentSection />
      <AuthStatus />
    </section>
  );
}
