import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

// No lastModified: the only honest value available at build time is the build
// timestamp, which would mark every page as freshly changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.nav.map((item) => ({
    url: new URL(item.href, siteConfig.site.url).href,
  }));
}
