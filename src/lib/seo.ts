import type { Metadata } from "next";
import { lowestMonthlyPrice } from "@/data/plans";
import { site } from "@/data/site";
import { formatBRL } from "./format";

export const siteTitle = "Adestramento de Cães em Arujá | Morbius Kennel";

/** ≤ 160 caracteres; o preço vem dos dados dos planos para nunca divergir. */
export const siteDescription = `Adestramento de cães em Arujá e região, com aulas na sua casa. Planos a partir de ${formatBRL(lowestMonthlyPrice)}/mês. Fale pelo WhatsApp.`;

export const ogImage = {
  url: "/images/morbius/og/og-morbius-kennel.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Morbius Kennel — adestramento de cães em domicílio em Arujá e região",
};

export const seoKeywords = [
  "adestramento de cães em Arujá",
  "adestrador de cães em Arujá SP",
  "adestramento canino em domicílio",
  "adestramento de cães Santa Isabel",
  "adestrador de cães Mogi das Cruzes",
  "adestramento de cães Guarulhos",
  "adestramento canino Alto Tietê",
  "adestramento comportamental canino",
  "adestramento de filhotes em Arujá",
  "passeio sem puxar a guia",
  "obediência básica para cães",
  "Morbius Kennel",
] as const;

/**
 * Campos de Open Graph comuns a todas as páginas.
 * Em páginas filhas, espalhe este objeto: um `openGraph` filho substitui o do layout por inteiro.
 */
export const baseOpenGraph = {
  type: "website",
  locale: "pt_BR",
  siteName: site.name,
  images: [ogImage],
} satisfies Metadata["openGraph"];
