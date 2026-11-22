import { describe, expect, it } from "vitest";
import { createWhatsAppLink, whatsappMessages } from "./whatsapp";

describe("createWhatsAppLink", () => {
  it("monta o link wa.me com o número oficial e o texto codificado", () => {
    expect(createWhatsAppLink("Olá! Tudo bem?")).toBe(
      "https://wa.me/5511920425303?text=Ol%C3%A1!%20Tudo%20bem%3F",
    );
  });

  it("preserva quebras de linha da mensagem", () => {
    expect(createWhatsAppLink("Linha 1\nLinha 2")).toBe(
      "https://wa.me/5511920425303?text=Linha%201%0ALinha%202",
    );
  });

  it("sem mensagem, retorna o link direto", () => {
    expect(createWhatsAppLink()).toBe("https://wa.me/5511920425303");
    expect(createWhatsAppLink("   ")).toBe("https://wa.me/5511920425303");
  });
});

describe("whatsappMessages", () => {
  it("cobre todas as origens de contato do site com intenção de saber mais", () => {
    for (const key of ["hero", "header", "location", "finalCta", "floating", "howItWorks", "faq", "footer"] as const) {
      expect(whatsappMessages[key]).toMatch(/^Olá!/);
      expect(whatsappMessages[key].toLowerCase()).toMatch(/(interesse em saber mais|gostaria de saber mais|saber mais)/);
    }
  });
});
