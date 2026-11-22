/**
 * Fonte única dos dados institucionais da Morbius Kennel.
 * Altere aqui contatos, horário e região — todos os componentes leem deste arquivo.
 * Itens ainda NÃO confirmados pela empresa estão listados em CONTEXTO_PROJETO.md (seção Pendências).
 */
export const site = {
  name: "Morbius Kennel",
  slogan: "Força, Nobreza e Equilíbrio",
  segment: "Adestramento canino",
  description:
    "Adestramento canino em domicílio em Arujá e região: comandos básicos, obediência avançada e adestramento comportamental, com aulas no endereço do cliente.",

  whatsapp: {
    number: "5511920425303",
    display: "+55 (11) 92042-5303",
    e164: "+5511920425303",
  },

  instagram: {
    url: "https://www.instagram.com/morbius.kennel/",
    handle: "@morbius.kennel",
  },

  location: {
    city: "Arujá",
    state: "SP",
    stateName: "São Paulo",
    country: "BR",
    serviceArea: "Arujá e região",
  },

  hours: {
    label: "Segunda a sábado, das 08h às 18h",
    short: "Seg. a sáb., 08h às 18h",
    opens: "08:00",
    closes: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const,
  },
} as const;

/** Âncoras com "/" na frente para funcionarem também fora da página inicial. */
export type NavItem = { label: string; href: `/#${string}` };

export const navigation: NavItem[] = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Planos", href: "/#planos" },
  { label: "Dúvidas", href: "/#duvidas" },
];
