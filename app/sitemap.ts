import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/projects", "/guestlog"].map((path) => ({
    url: new URL(path, "https://chiragdalmia.com").href,
    lastModified: new Date(),
  }));
}
