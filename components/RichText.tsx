import Link from "next/link";
import React from "react";
import type { RichText } from "@/lib/config";

// Renders a RichText array (see lib/config.ts): plain strings become text,
// { text, href } entries become links. Segments are rendered with no extra
// whitespace between them, so spacing is controlled entirely by the strings.
export default function RichTextRenderer({ content }: { content: RichText }) {
  return (
    <>
      {content.map((segment, i) =>
        typeof segment === "string" ? (
          <React.Fragment key={i}>{segment}</React.Fragment>
        ) : (
          <Link key={i} href={segment.href}>
            {segment.text}
          </Link>
        )
      )}
    </>
  );
}
