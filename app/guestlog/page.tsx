import { auth } from "@/lib/auth";
import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <h1>Guest Book</h1>
      {session?.user ? (
        <p>Wassup, {session.user.name}! Share your thoughts below.()</p>
      ) : (
        <p>Join the conversation! Sign in to leave a comment.</p>
      )}
      <AuthStatus />
      <CommentSection />
    </main>
  );
}
