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
    expect(address?.postalCode).toBe("07400-000");

    expect(business?.hasMap).toBeDefined();
    expect(business?.geo).toBeDefined();
    expect(business?.areaServed).toBeDefined();

    const areaList = business?.areaServed as Array<Record<string, unknown>>;
    const geoCircle = areaList.find((a) => a["@type"] === "GeoCircle");
    expect(geoCircle).toBeDefined();
    expect(geoCircle?.geoRadius).toBe(50000);

    const sameAs = business?.sameAs as string[];
    expect(sameAs).toContain("https://www.wikidata.org/wiki/Q38782");
    expect(business?.openingHoursSpecification).toBeDefined();
  });

  it("inclui Service com catálogo de ofertas de adestramento e serviços especializados", () => {
    const services = graph.filter((item) => item["@type"] === "Service");
    expect(services.length).toBeGreaterThanOrEqual(4);

    const mainService = services.find((s) => s["@id"]?.toString().endsWith("#servico"));
    expect(mainService).toBeDefined();
    expect(mainService?.name).toBe("Adestramento canino em domicílio");
    expect(mainService?.provider).toBeDefined();
    expect(mainService?.hasOfferCatalog || mainService?.offers).toBeDefined();

    const obediencia = services.find((s) => s["@id"]?.toString().endsWith("#servico-obediencia"));
    expect(obediencia).toBeDefined();
    expect(obediencia?.name).toContain("Obediência");

    const passeio = services.find((s) => s["@id"]?.toString().endsWith("#servico-passeio"));
    expect(passeio).toBeDefined();
    expect(passeio?.name).toContain("Passeio");

    const comportamento = services.find((s) => s["@id"]?.toString().endsWith("#servico-comportamento"));
    expect(comportamento).toBeDefined();
    expect(comportamento?.name).toContain("Comportamento");
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
