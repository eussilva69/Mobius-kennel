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
  });
});
