import { AuthStatus } from "@/components/AuthStatus";
import { getCurrentUser } from "@/lib/auth";


export default async function Page() {
 const user = await getCurrentUser();
  return (
    <section className="py-6">
    
      {user ? (
        <p className="text-2xl">You are signed in as {user.email}</p>
      ) : (
        <p className="text-2xl">You are not signed in</p>
      )}
      <AuthStatus />
    </section>
  );
}
