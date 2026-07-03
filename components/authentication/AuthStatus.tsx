"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthStatus() {
  const { status } = useSession();
  // Keep the button in the layout while the session loads so it doesn't
  // pop in and shift the page once auth resolves.
  return (
    <button
      onClick={() => (status === "authenticated" ? signOut() : signIn())}
      className={`absolute md:-top-2 top-3 -translate-x-1/2 right-3 ${
        status === "loading" ? "invisible" : ""
      }`}
    >
      Sign {status === "authenticated" ? "out" : "in"}
    </button>
  );
}
