import { auth } from "@/lib/auth";
import { AuthStatus } from "@/components/authentication/AuthStatus";
import CommentSection from "@/components/commentStuff/CommentSection";

export default async function Page() {
  const session = await auth();

  // Function to get the first name and format it
  const formatFirstName = (fullName: string) => {
    const firstName = fullName.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Guest Book</h1>
      {session?.user ? (
        <p className="mb-4">
          Wassup, {formatFirstName(session.user.name || "")}! Share your
          thoughts below.🤓
        </p>
      ) : (
        <p className="mb-4">
          Join the conversation! Sign in to leave a comment.
        </p>
      )}
      <AuthStatus />
      <CommentSection />
    </main>
  );
}
