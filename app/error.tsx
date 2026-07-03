"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <h1 className="mt-0">Something went wrong</h1>
      <p>
        An unexpected error occurred while loading this page. It&apos;s
        probably temporary.
      </p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
