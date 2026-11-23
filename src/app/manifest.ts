import type { MetadataRoute } from "next";
import { siteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Morbius Kennel — Adestramento Canino",
    short_name: "Morbius Kennel",
    description: siteDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0e0e0d",
    theme_color: "#0e0e0d",
    lang: "pt-BR",
    categories: ["lifestyle", "pets", "business"],
    shortcuts: [
      {
        name: "Ver Planos de Adestramento",
        short_name: "Planos",
        description: "Confira as opções de adestramento e mensalidades",
        url: "/#planos",
        icons: [{ src: "/icon.png", sizes: "192x192" }],
      },
      {
        name: "Falar com o Adestrador",
        short_name: "WhatsApp",
        description: "Conversar diretamente pelo WhatsApp",
        url: "/#contato",
        icons: [{ src: "/icon.png", sizes: "192x192" }],
      },
    ],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
