import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.nav.map((item) => ({
    url: new URL(item.href, siteConfig.site.url).href,
    lastModified: new Date(),
  }));
}
