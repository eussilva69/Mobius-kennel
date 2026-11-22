import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("app/sitemap", () => {
  it("gera sitemap com páginas principais, prioridade e frequência de alteração", () => {
    const items = sitemap();
    expect(items.length).toBeGreaterThanOrEqual(2);

    const home = items.find((i) => i.url.endsWith("/"));
    expect(home).toBeDefined();
    expect(home?.lastModified).toBeDefined();
    expect(home?.changeFrequency).toBe("weekly");
    expect(home?.priority).toBe(1.0);

    const privacy = items.find((i) => i.url.includes("politica-de-privacidade"));
    expect(privacy).toBeDefined();
    expect(privacy?.priority).toBe(0.3);
  });
});
