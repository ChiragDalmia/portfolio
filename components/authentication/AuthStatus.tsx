"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthStatus() {
  const { status } = useSession();
  return status === "loading" ? (
    <p>...</p>
  ) : (
    <button onClick={() => (status === "authenticated" ? signOut() : signIn())}>
      Sign {status === "authenticated" ? "out" : "in"}
    </button>
  );
}
