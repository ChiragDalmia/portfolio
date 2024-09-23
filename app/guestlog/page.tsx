import { AuthStatus } from "@/components/AuthStatus";
import { getCurrentUser } from "@/lib/auth";

export default async function Page() {
 const user = await getCurrentUser();
  return (
    <section>
      {user ? (
        <p className="text-2xl">
        Hey, Leave a commemt here?
        </p>
      ) : (
        <></>
      )}
      <AuthStatus />
    </section>
  );
}
