import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <section>
      <h1 className="mt-0">{siteConfig.notFound.heading}</h1>
      <p>{siteConfig.notFound.body}</p>
      <Link href="/">{siteConfig.notFound.backLabel}</Link>
    </section>
  );
}
