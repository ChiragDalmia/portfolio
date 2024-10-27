"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthStatus() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>...</p>;
  }

  if (status === "unauthenticated") {
    return (
        <button onClick={() => signIn()}>Sign in</button>
    );
  }

  return (
      <button onClick={() => signOut()}>Sign out</button>
  );
}
