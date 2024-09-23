"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthStatus() {
  const { status } = useSession();

  if (status === "loading") {
    return <div></div>;
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
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
