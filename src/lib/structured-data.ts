import { faqs } from "@/data/faqs";
import { plans } from "@/data/plans";
import { site } from "@/data/site";
import { siteDescription, siteTitle } from "./seo";
import { getSiteUrl } from "./site-url";

/** Cidades atendidas na região de Arujá e Alto Tietê / Grande SP */
const servedCities = [
  "Arujá",
  "Santa Isabel",
  "Mogi das Cruzes",
  "Guarulhos",
  "Itaquaquecetuba",
  "Suzano",
  "Poá",
  "São Paulo",
];

/**
 * Dados estruturados (schema.org) completos e interligados via @graph.
 * Configurados estritamente com informações e localização confirmadas.
 */
export function buildStructuredData() {
  const url = getSiteUrl().origin;
  const id = (fragment: string) => `${url}/#${fragment}`;
  const prices = plans.map((p) => p.monthlyPrice);

  const areaServed = servedCities.map((city) => ({
    "@type": "City",
    name: city,
    containedInPlace: { "@type": "State", name: site.location.stateName },
  }));

  const business = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": id("empresa"),
    name: site.name,
    legalName: site.name,
    slogan: site.slogan,
    description: site.description,
    url,
    telephone: site.whatsapp.e164,
    image: `${url}/images/morbius/og/og-morbius-kennel.jpg`,
    logo: `${url}/images/morbius/brand/logo-emblem.png`,
    sameAs: [site.instagram.url],
    priceRange: `R$ ${Math.min(...prices)} a R$ ${Math.max(...prices)} por mês`,
    currenciesAccepted: "BRL",
    paymentAccepted: "PIX, Cartão de Crédito",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      addressCountry: site.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.3967,
      longitude: -46.3203,
    },
    areaServed,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days.map((d) => `https://schema.org/${d}`),
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.whatsapp.e164,
      contactType: "customer service",
      availableLanguage: ["Portuguese"],
    },
    knowsAbout: [
      "Adestramento canino em domicílio",
      "Obediência canina básica e avançada",
      "Modificação de comportamento canino",
      "Socialização de filhotes",
      "Passeio estruturado sem puxar a guia",
      "Tratamento de ansiedade e reatividade em cães",
    ],
  };

  const offers = plans.map((p) => ({
    "@type": "Offer",
    name: `Plano ${p.name}`,
    description: p.summary,
    price: p.monthlyPrice,
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.monthlyPrice,
      priceCurrency: "BRL",
      unitCode: "MON",
      billingDuration: p.months ?? 1,
    },
  }));

  const service = {
    "@type": "Service",
    "@id": id("servico"),
    name: "Adestramento canino em domicílio",
    serviceType: "Adestramento e Comportamento Canino",
    provider: { "@id": id("empresa") },
    areaServed,
    description:
      "Aulas práticas de adestramento canino realizadas diretamente no domicílio do cliente em Arujá e região: comandos fundamentais, obediência avançada, passeio sem puxar e orientação familiar.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planos de Adestramento Morbius Kennel",
      itemListElement: offers,
    },
    offers,
  };

  const website = {
    "@type": "WebSite",
    "@id": id("site"),
    url,
    name: site.name,
    inLanguage: "pt-BR",
    publisher: { "@id": id("empresa") },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": id("breadcrumb"),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: `${url}/`,
      },
    ],
  };

  const webpage = {
    "@type": "WebPage",
    "@id": id("webpage"),
    url: `${url}/`,
    name: siteTitle,
    description: siteDescription,
    inLanguage: "pt-BR",
    isPartOf: { "@id": id("site") },
    about: { "@id": id("empresa") },
    breadcrumb: { "@id": id("breadcrumb") },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": id("duvidas"),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [business, service, website, webpage, breadcrumb, faqPage],
  };
}

/**
 * Dados estruturados para a página de Política de Privacidade.
 */
export function buildPrivacyStructuredData() {
  const url = getSiteUrl().origin;
  const id = (fragment: string) => `${url}/#${fragment}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": id("breadcrumb-privacidade"),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Política de privacidade",
            item: `${url}/politica-de-privacidade`,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": id("webpage-privacidade"),
        url: `${url}/politica-de-privacidade`,
        name: `Política de privacidade | ${site.name}`,
        description: `Informações sobre proteção de dados, privacidade e LGPD da ${site.name}.`,
        inLanguage: "pt-BR",
        isPartOf: { "@id": id("site") },
        breadcrumb: { "@id": id("breadcrumb-privacidade") },
      },
    ],
  };
}

/** Serializa com segurança para <script type="application/ld+json">. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
