import type { MetadataRoute } from "next";

const siteUrl = "https://www.romil.live";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/work", "/moments", "/contact"].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
