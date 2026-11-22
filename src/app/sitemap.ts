import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Atualize a data quando o conteúdo da página mudar de forma relevante. */
const CONTENT_UPDATED_AT = "2026-11-21";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  return [
    {
      url: `${base}/`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [`${base}/images/morbius/og/og-morbius-kennel.jpg`],
    },
    {
      url: `${base}/politica-de-privacidade`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
