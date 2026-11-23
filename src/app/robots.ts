import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().origin;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Principais buscadores da web e indexação de imagens
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          "YandexBot",
        ],
        allow: "/",
      },
      {
        // Crawlers de pré-visualização em redes sociais e apps de mensagens
        userAgent: [
          "facebookexternalhit",
          "Facebot",
          "Twitterbot",
          "WhatsApp",
          "LinkedInBot",
        ],
        allow: "/",
      },
      {
        // Motores de busca por IA e assistentes conversacionais (AI Overviews)
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Amazonbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
