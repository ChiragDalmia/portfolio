import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

const { site, seo, author, social } = siteConfig;

// app/opengraph-image.jpg is served at this path. A page that sets its own
// openGraph loses the file-convention image, so it's referenced explicitly.
const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${author.name} profile card`,
};

// Per-page metadata. Next.js replaces (not merges) nested objects like
// openGraph from the layout, so every page sets its own og/twitter fields —
// otherwise each page would share the homepage's og:title, og:url, etc.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  modifiedTime,
}: {
  title: string; // full title, used as-is (no template)
  description: string;
  path: string;
  type?: "website" | "article";
  modifiedTime?: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: seo.ogSiteName,
      url: path,
      title,
      description,
      images: [shareImage],
      ...(type === "article" ? { type, modifiedTime } : { type }),
    },
    twitter: {
      card: "summary_large_image",
      site: seo.twitterHandle,
      creator: seo.twitterHandle,
      title,
      description,
      images: [shareImage],
    },
  };
}

// Stable JSON-LD ids so every page describes the same entities.
export const personId = `${site.url}/#person`;
export const websiteId = `${site.url}/#website`;
export const personRef = {
  "@type": "Person",
  "@id": personId,
  name: author.name,
  url: site.url,
};

export const person = {
  ...personRef,
  jobTitle: author.role,
  homeLocation: { "@type": "Country", name: author.location },
  description: author.bio,
  worksFor: { "@type": "Organization", ...author.worksFor },
  knowsAbout: author.knowsAbout,
  sameAs: [...social.map((s) => s.url), ...author.otherProfiles],
};

export const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: site.url,
  name: seo.ogSiteName,
  inLanguage: "en",
  publisher: { "@id": personId },
};

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: new URL(item.path, site.url).href,
  })),
});
