"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthStatus() {
  const { status } = useSession();
  return status === "loading" ? null : (
    <button
      onClick={() => (status === "authenticated" ? signOut() : signIn())}
      className="absolute md:-top-2 top-3 -translate-x-1/2 right-3"
    >
      Sign {status === "authenticated" ? "out" : "in"}
    </button>
  );
}
