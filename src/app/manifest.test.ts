import { describe, expect, it } from "vitest";
import manifest from "./manifest";

describe("app/manifest", () => {
  it("gera web app manifest com configurações de PWA e metadados", () => {
    const config = manifest();
    expect(config.name).toBe("Morbius Kennel — Adestramento Canino");
    expect(config.short_name).toBe("Morbius Kennel");
    expect(config.start_url).toBe("/");
    expect(config.display).toBe("standalone");
    expect(config.background_color).toBe("#0e0e0d");
    expect(config.theme_color).toBe("#0e0e0d");
    expect(config.icons).toBeDefined();
    expect(config.icons?.length).toBeGreaterThan(0);
  });
});
