import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Atualize a data quando o conteúdo da página mudar de forma relevante. */
const CONTENT_UPDATED_AT = "2026-11-23";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  return [
    {
      url: `${base}/`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "pt-BR": `${base}/`,
          "x-default": `${base}/`,
        },
      },
      images: [
        `${base}/images/morbius/og/og-morbius-kennel.jpg`,
        `${base}/images/morbius/hero/adestrador-e-cao-recorte.webp`,
        `${base}/images/morbius/hero/adestrador-dois-caes-recorte.webp`,
        `${base}/images/morbius/treinamentos/obediencia-cao-sentado.webp`,
        `${base}/images/morbius/treinamentos/passeio-na-guia.webp`,
        `${base}/images/morbius/treinamentos/comportamento-rottweiler-maltes.webp`,
        `${base}/images/morbius/profissionais/adestrador-com-cao.webp`,
        `${base}/images/morbius/brand/logo-emblem.png`,
      ],
    },
    {
      url: `${base}/politica-de-privacidade`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: {
          "pt-BR": `${base}/politica-de-privacidade`,
          "x-default": `${base}/politica-de-privacidade`,
        },
      },
    },
  ];
}
