import { describe, expect, it } from "vitest";
import { buildStructuredData, jsonLd } from "./structured-data";

type JsonLdEntity = Record<string, unknown>;

describe("lib/structured-data", () => {
  const data = buildStructuredData();
  const graph = data["@graph"] as JsonLdEntity[];

  it("retorna contexto schema.org e grafo de entidades", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(Array.isArray(graph)).toBe(true);
  });

  it("inclui LocalBusiness / ProfessionalService com área de atuação e contatos", () => {
    const business = graph.find((item) => {
      const type = item["@type"];
      return Array.isArray(type) ? type.includes("LocalBusiness") : type === "LocalBusiness";
    });

    expect(business).toBeDefined();
    expect(business?.name).toBe("Morbius Kennel");
    expect(business?.telephone).toBe("+5511920425303");

    const address = business?.address as Record<string, unknown> | undefined;
    expect(address).toBeDefined();
    expect(address?.addressLocality).toBe("Arujá");
    expect(address?.addressRegion).toBe("SP");

    expect(business?.areaServed).toBeDefined();
    expect(business?.openingHoursSpecification).toBeDefined();
  });

  it("inclui Service com catálogo de ofertas de adestramento", () => {
    const service = graph.find((item) => item["@type"] === "Service");
    expect(service).toBeDefined();
    expect(service?.name).toBe("Adestramento canino em domicílio");
    expect(service?.provider).toBeDefined();
    expect(service?.hasOfferCatalog || service?.offers).toBeDefined();
  });

  it("inclui WebSite e FAQPage válidos", () => {
    const website = graph.find((item) => item["@type"] === "WebSite");
    const faq = graph.find((item) => item["@type"] === "FAQPage");

    expect(website).toBeDefined();
    expect(website?.inLanguage).toBe("pt-BR");

    expect(faq).toBeDefined();
    const mainEntity = faq?.mainEntity as Array<Record<string, unknown>> | undefined;
    expect(Array.isArray(mainEntity)).toBe(true);
    expect(mainEntity && mainEntity.length > 0).toBe(true);

    const firstQuestion = mainEntity?.[0];
    expect(firstQuestion?.["@type"]).toBe("Question");
    const acceptedAnswer = firstQuestion?.acceptedAnswer as Record<string, unknown> | undefined;
    expect(acceptedAnswer?.["@type"]).toBe("Answer");
  });

  it("inclui BreadcrumbList para navegação estruturada", () => {
    const breadcrumb = graph.find((item) => item["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeDefined();

    const elements = breadcrumb?.itemListElement as unknown[] | undefined;
    expect(Array.isArray(elements)).toBe(true);
    expect(elements && elements.length >= 1).toBe(true);
  });

  it("serializa jsonLd escapando caracteres < para segurança contra XSS", () => {
    const serialized = jsonLd({ test: "<script>alert('xss')</script>" });
    expect(serialized).not.toContain("<script>");
    expect(serialized).toContain("\\u003cscript");
  });
});
