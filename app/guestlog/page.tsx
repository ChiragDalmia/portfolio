import { auth } from "@/lib/auth";
import { AuthStatus } from "@/components/authentication/AuthStatus";

export default async function Page() {
  const session = await auth();

  return (
    <section>
      {session?.user ? (
        <p className="text-2xl">Hey, Leave a comment here?</p>
      ) : null}
      <AuthStatus />
    </section>
  );
}
