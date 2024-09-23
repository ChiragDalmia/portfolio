import { AuthStatus } from "@/components/AuthStatus";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";


export default async function Page() {
 const user = await getCurrentUser();
  return (
    <section className="py-6">
      {user ? (
        <p className="text-2xl">
          You are signed in as {user.username}
          <Link href={`https://github.com/${user.username}`}>hvjv</Link>
        </p>
      ) : (
        <p className="text-2xl">You are not signed in</p>
      )}
      <AuthStatus />
    </section>
  );
}
