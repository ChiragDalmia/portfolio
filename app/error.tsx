"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/config";

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
      <h1 className="mt-0">{siteConfig.errorPage.heading}</h1>
      <p>{siteConfig.errorPage.body}</p>
      <button type="button" onClick={reset}>
        {siteConfig.errorPage.retryLabel}
      </button>
    </section>
  );
}
