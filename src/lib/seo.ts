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
  // Marca, variações de digitação e nomes alternativos
  "Morbius Kennel",
  "Morbius Kennel adestramento",
  "Morbius Kennel Arujá",
  "Mobius Kennel",
  "Mobius Kennel adestramento",
  "Canil Morbius",
  "Canil Morbius Arujá",
  "adestrador Morbius",

  // Localização / GEO Alto Tietê, Grande SP e Condomínios de Arujá
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
  "adestrador condomínio Arujá 5",
  "adestrador condomínio Arujá Hills",
  "adestrador Arujazinho",
  "adestrador condomínio Real Park Arujá",

  // Termos populares, leigos e correlacionados
  "adestrador de cachorros",
  "adestramento de cachorro",
  "adestrador de cachoro",
  "treinador de cães em Arujá",
  "treinador de cachorros",
  "educador canino Arujá",
  "educador canino particular",
  "comportamentalista canino Arujá",
  "especialista em comportamento canino",

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

  // Dores e buscas sintomáticas (como as pessoas realmente pesquisam)
  "como fazer cachorro parar de puxar a guia",
  "cachorro puxando a guia no passeio",
  "passeio estruturado sem puxar a guia",
  "cachorro late para outros cães na rua",
  "cão reativo com pessoas e outros animais",
  "como fazer cachorro parar de pular nas visitas",
  "cachorro mordendo a mão de brincadeira como parar",
  "filhote fazendo xixi e cocô no lugar errado",
  "ansiedade de separação canina adestrador",
  "cachorro destruindo móveis quando fica sozinho",
  "cachorro comendo fezes coprofagia adestramento",
  "cachorro rosnando por comida posse de recursos",
  "adestramento para cão agitado",
  "cão desobediente dentro de casa",
  "adestrador de cães perto de mim",
  "quanto custa adestramento de cães Arujá",

  // Raças populares atendidas
  "adestramento de pastor alemão Arujá",
  "adestramento de rottweiler Arujá",
  "adestramento de pitbull Arujá",
  "adestramento de golden retriever Arujá",
  "adestramento de border collie SP",
  "adestramento de spitz alemão lulu da pomerânia",
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
