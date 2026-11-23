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
    postalCode: "07400-000",
    serviceArea: "Arujá e região",
    regionName: "Alto Tietê e Grande São Paulo",
    latitude: -23.3967,
    longitude: -46.3203,
    radiusKm: 50,
    mapsUrl: "https://maps.google.com/?q=Morbius+Kennel+Adestramento+de+C%C3%A3es+Aruj%C3%A1+SP",
    servedCities: [
      { name: "Arujá", wikidataId: "Q958869" },
      { name: "Santa Isabel", wikidataId: "Q958660" },
      { name: "Mogi das Cruzes", wikidataId: "Q840003" },
      { name: "Guarulhos", wikidataId: "Q184409" },
      { name: "Itaquaquecetuba", wikidataId: "Q926806" },
      { name: "Poá", wikidataId: "Q958682" },
      { name: "Suzano", wikidataId: "Q841253" },
      { name: "Ferraz de Vasconcelos", wikidataId: "Q927702" },
      { name: "São Paulo", wikidataId: "Q174" },
    ],
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
