import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

const url = (path: string) => new URL(path, siteConfig.site.url).href;

// Nav pages have no lastModified: the only date available at build time is the
// build timestamp, which would mark every page as changed on every deploy.
// Case studies carry a hand-maintained `updated` date (also shown on the page).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...siteConfig.nav.map((item) => ({ url: url(item.href) })),
    ...Object.entries(siteConfig.caseStudies).map(([slug, study]) => ({
      url: url(`/projects/${slug}`),
      lastModified: study.updated,
    })),
  ];
}
