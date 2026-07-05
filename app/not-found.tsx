import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.notFound.heading,
};

export default function NotFound() {
  return (
    <section>
      <h1 className="mt-0">{siteConfig.notFound.heading}</h1>
      <p>{siteConfig.notFound.body}</p>
      <Link href="/">{siteConfig.notFound.backLabel}</Link>
    </section>
  );
}
