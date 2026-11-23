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
  // Marca e termos institucionais
  "Morbius Kennel",
  "Morbius Kennel adestramento",
  "Morbius Kennel Arujá",

  // Localização / GEO Alto Tietê e Grande SP
  "adestramento de cães em Arujá",
  "adestrador de cães em Arujá SP",
  "adestramento canino Arujá e região",
  "adestrador de cães Santa Isabel",
  "adestramento de cães Santa Isabel SP",
  "adestrador de cães Mogi das Cruzes",
  "adestramento canino Mogi das Cruzes",
  "adestrador de cães Guarulhos",
  "adestramento de cães Guarulhos SP",
  "adestrador de cães Itaquaquecetuba",
  "adestrador de cães Suzano",
  "adestrador de cães Poá",
  "adestramento canino Alto Tietê",

  // Serviços e modalidades
  "adestramento canino em domicílio",
  "adestrador particular de cães",
  "aula de adestramento na casa do cliente",
  "obediência básica para cães",
  "obediência canina avançada",
  "comandos básicos de adestramento",
  "adestramento comportamental canino",
  "adestrador para cão reativo",
  "adestramento de filhotes em domicílio",
  "socialização de filhotes e cães",

  // Dores e buscas correlacionadas de alta intenção
  "como fazer cachorro parar de puxar a guia",
  "cachorro puxando a guia no passeio",
  "passeio estruturado sem puxar a guia",
  "cachorro late para outros cães na rua",
  "cão reativo com pessoas e outros animais",
  "ansiedade de separação canina adestrador",
  "cachorro destruindo móveis quando fica sozinho",
  "adestramento para cão agitado",
  "cão desobediente dentro de casa",
  "adestrador de cães perto de mim",
  "quanto custa adestramento de cães Arujá",
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
