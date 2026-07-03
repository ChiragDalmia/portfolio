import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1 className="mt-0">Page not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist (or moved).</p>
      <Link href="/">Back to Home</Link>
    </section>
  );
}
