import { faqs } from "@/data/faqs";
import { plans } from "@/data/plans";
import { site } from "@/data/site";
import { siteDescription, siteTitle } from "./seo";
import { getSiteUrl } from "./site-url";


/**
 * Dados estruturados (schema.org) completos e interligados via @graph.
 * Configurados estritamente com informações e localização confirmadas,
 * enriquecidos com GEO-targeting, entidades Wikidata e serviços individuais.
 */
export function buildStructuredData() {
  const url = getSiteUrl().origin;
  const id = (fragment: string) => `${url}/#${fragment}`;
  const prices = plans.map((p) => p.monthlyPrice);

  const cityEntities = site.location.servedCities.map((city) => ({
    "@type": "City",
    name: city.name,
    sameAs: `https://www.wikidata.org/wiki/${city.wikidataId}`,
    containedInPlace: { "@type": "State", name: site.location.stateName },
  }));

  const geoCircle = {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: site.location.latitude,
      longitude: site.location.longitude,
    },
    geoRadius: site.location.radiusKm * 1000,
  };

  const areaServed = [...cityEntities, geoCircle];

  const business = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": id("empresa"),
    name: site.name,
    legalName: site.name,
    alternateName: [
      "Mobius Kennel",
      "Mobius Kennel Adestramento",
      "Canil Morbius",
      "Morbius Adestramento Canino",
      "Morbius Treinamento Canino",
      "Morbius Kennel Arujá",
    ],
    slogan: site.slogan,
    description: site.description,
    url,
    telephone: site.whatsapp.e164,
    image: `${url}/images/morbius/og/og-morbius-kennel.jpg`,
    logo: `${url}/images/morbius/brand/logo-emblem.png`,
    hasMap: site.location.mapsUrl,
    sameAs: [
      site.instagram.url,
      "https://www.wikidata.org/wiki/Q38782", // Adestramento de cães (Dog Training)
      "https://www.wikidata.org/wiki/Q2982880", // Comportamento canino (Dog Behavior)
    ],
    priceRange: `R$ ${Math.min(...prices)} a R$ ${Math.max(...prices)} por mês`,
    currenciesAccepted: "BRL",
    paymentAccepted: "PIX, Cartão de Crédito",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      postalCode: site.location.postalCode,
      addressCountry: site.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.latitude,
      longitude: site.location.longitude,
    },
    areaServed,
    serviceArea: geoCircle,
    isAccessibleForFree: false,
    knowsLanguage: ["pt-BR", "Portuguese"],
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
    potentialAction: {
      "@type": "CommunicateAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: `https://wa.me/${site.whatsapp.number}`,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      ],
    },
    knowsAbout: [
      "Adestramento canino em domicílio",
      "Adestramento de cães em Arujá e Alto Tietê",
      "Treinador de cães e educador canino particular",
      "Comandos básicos de obediência (senta, fica, vem, junto)",
      "Obediência canina avançada",
      "Passeio estruturado sem puxar a guia",
      "Modificação de comportamento e controle de reatividade",
      "Tratamento de ansiedade por separação e agitação canina",
      "Socialização de filhotes e cães adultos",
      "Educação sanitária e limites dentro de casa (xixi e cocô no lugar certo)",
      "Inibição de mordidas de brincadeira e controle de pulos em visitas",
      "Prevenção de destruição de móveis e objetos",
      "Controle de latidos excessivos no portão e campainha",
      "Prevenção de posse de recursos (rosnar por comida ou brinquedos)",
      "Adestramento de raças de trabalho e grande porte (Pastor Alemão, Rottweiler, Pitbull)",
      "Adestramento de cães de companhia e porte pequeno (Spitz Alemão, Maltês, Shih Tzu, Buldogue)",
      "Atendimento em condomínios residenciais fechados em Arujá e região",
    ],
  };

  const offers = plans.map((p) => ({
    "@type": "Offer",
    name: `Plano ${p.name}`,
    description: p.summary,
    price: p.monthlyPrice,
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: `${url}/#planos`,
    seller: { "@id": id("empresa") },
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.monthlyPrice,
      priceCurrency: "BRL",
      unitCode: "MON",
      billingDuration: p.months ?? 1,
    },
  }));

  const mainService = {
    "@type": "Service",
    "@id": id("servico"),
    name: "Adestramento canino em domicílio",
    serviceType: "Adestramento e Comportamento Canino",
    provider: { "@id": id("empresa") },
    areaServed,
    termsOfService: `${url}/politica-de-privacidade`,
    description:
      "Aulas práticas de adestramento canino realizadas diretamente no domicílio do cliente em Arujá, Santa Isabel, Mogi das Cruzes e região: comandos fundamentais, obediência avançada, passeio sem puxar e orientação familiar.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planos de Adestramento Morbius Kennel",
      itemListElement: offers,
    },
    offers,
  };

  const obedienciaService = {
    "@type": "Service",
    "@id": id("servico-obediencia"),
    name: "Obediência Canina Básica e Avançada em Domicílio",
    serviceType: "Obediência Canina",
    provider: { "@id": id("empresa") },
    areaServed,
    termsOfService: `${url}/politica-de-privacidade`,
    description:
      "Treinamento prático de comandos de controle e foco (senta, fica, vem, junto) na rotina da casa, com a família orientada para manter os resultados.",
    url: `${url}/#servicos`,
  };

  const passeioService = {
    "@type": "Service",
    "@id": id("servico-passeio"),
    name: "Treinamento de Passeio Estruturado sem Puxar a Guia",
    serviceType: "Passeio na Guia",
    provider: { "@id": id("empresa") },
    areaServed,
    termsOfService: `${url}/politica-de-privacidade`,
    description:
      "Treino prático na rua e calçada para o cão caminhar ao lado do tutor sem tracionar a guia e sem avançar em outros cães, pessoas ou veículos.",
    url: `${url}/#servicos`,
  };

  const comportamentoService = {
    "@type": "Service",
    "@id": id("servico-comportamento"),
    name: "Modificação de Comportamento e Reatividade Canina",
    serviceType: "Comportamento Canino",
    provider: { "@id": id("empresa") },
    areaServed,
    termsOfService: `${url}/politica-de-privacidade`,
    description:
      "Solução para cães reativos, ansiosos, com latidos excessivos, receio de visitas ou destruição de objetos no ambiente doméstico.",
    url: `${url}/#servicos`,
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
    primaryImageOfPage: `${url}/images/morbius/og/og-morbius-kennel.jpg`,
    datePublished: "2026-11-21",
    dateModified: "2026-11-23",
    isPartOf: { "@id": id("site") },
    about: { "@id": id("empresa") },
    breadcrumb: { "@id": id("breadcrumb") },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero-title", "#sobre-title", "#servicos-title", "#duvidas"],
    },
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
    "@graph": [
      business,
      mainService,
      obedienciaService,
      passeioService,
      comportamentoService,
      website,
      webpage,
      breadcrumb,
      faqPage,
    ],
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
