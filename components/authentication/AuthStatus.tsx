"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div>
        I hate signIn/signUps <br /> but you have to <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      Signed in as {session?.user?.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}