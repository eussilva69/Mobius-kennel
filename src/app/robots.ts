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
          "Googlebot-News",
          "Googlebot-Video",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          "YandexBot",
          "Baiduspider",
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
          "Pinterestbot",
          "TelegramBot",
          "Discordbot",
        ],
        allow: "/",
      },
      {
        // Motores de busca por IA e assistentes conversacionais (GEO - Generative Engine Optimization)
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "Amazonbot",
          "cohere-ai",
          "Meta-ExternalAgent",
        ],
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
