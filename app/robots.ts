import type { MetadataRoute } from "next";

const PUBLIC_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Claude-SearchBot",
  "Claude-User",
];

export default function robots(): MetadataRoute.Robots {
  const publicRule = { allow: "/", disallow: "/api/" };

  return {
    rules: [
      { userAgent: "*", ...publicRule },
      ...PUBLIC_CRAWLERS.map((userAgent) => ({ userAgent, ...publicRule })),
    ],
    sitemap: "https://docs.conta.vc/sitemap.xml",
    host: "https://docs.conta.vc",
  };
}
