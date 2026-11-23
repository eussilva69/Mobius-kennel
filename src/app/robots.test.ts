import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("app/robots", () => {
  it("gera regras com sitemap e permissão de indexação", () => {
    const config = robots();
    expect(config.sitemap).toContain("/sitemap.xml");

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    expect(rules.length).toBeGreaterThan(0);

    const generalRule = rules.find((r) => r.userAgent === "*");
    expect(generalRule).toBeDefined();
    expect(generalRule?.allow).toBe("/");

    // Regras dedicadas para buscadores, pré-visualização social e IA (GEO)
    const allUserAgents = rules.flatMap((r) => (Array.isArray(r.userAgent) ? r.userAgent : [r.userAgent]));
    expect(allUserAgents).toContain("Googlebot");
    expect(allUserAgents).toContain("WhatsApp");
    expect(allUserAgents).toContain("GPTBot");
    expect(allUserAgents).toContain("ClaudeBot");
    expect(allUserAgents).toContain("PerplexityBot");
  });
});
