import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

const SITE_URL = "https://docs.conta.vc";

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: new URL(page.url, SITE_URL).toString(),
    changeFrequency: "weekly",
    priority: page.url === "/docs" || page.url === "/en/docs" ? 1 : 0.7,
  }));
}
