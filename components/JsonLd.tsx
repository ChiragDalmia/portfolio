// Structured data as a <script> in the page body (the approach the Next.js
// JSON-LD guide recommends). "<" is escaped so the JSON can't close the tag.
export default function JsonLd({ graph }: { graph: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
