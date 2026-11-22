import { describe, expect, it } from "vitest";
import { baseOpenGraph, ogImage, siteDescription, siteTitle } from "./seo";

describe("lib/seo", () => {
  it("possui siteTitle descritivo com localização e nome da marca", () => {
    expect(siteTitle).toContain("Arujá");
    expect(siteTitle).toContain("Morbius Kennel");
    expect(siteTitle.length).toBeLessThanOrEqual(70);
  });

  it("possui siteDescription concisa e menor que 160 caracteres", () => {
    expect(siteDescription.length).toBeGreaterThan(50);
    expect(siteDescription.length).toBeLessThanOrEqual(160);
    expect(siteDescription).toContain("Arujá");
  });

  it("define ogImage com dimensões recomendadas (1200x630)", () => {
    expect(ogImage.width).toBe(1200);
    expect(ogImage.height).toBe(630);
    expect(ogImage.url).toBe("/images/morbius/og/og-morbius-kennel.jpg");
    expect(ogImage.alt).toBeTruthy();
  });

  it("configura baseOpenGraph com locale pt_BR e tipo website", () => {
    expect(baseOpenGraph.locale).toBe("pt_BR");
    expect(baseOpenGraph.type).toBe("website");
    expect(baseOpenGraph.siteName).toBe("Morbius Kennel");
    expect(baseOpenGraph.images).toBeDefined();
  });
});
