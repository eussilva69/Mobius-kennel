import { describe, expect, it } from "vitest";
import { buildDogMessage, joinPt, sanitizeRegion } from "./messages";

describe("joinPt", () => {
  it("une itens à moda do português", () => {
    expect(joinPt([])).toBe("");
    expect(joinPt(["a"])).toBe("a");
    expect(joinPt(["a", "b"])).toBe("a e b");
    expect(joinPt(["a", "b", "c"])).toBe("a, b e c");
  });
});

describe("sanitizeRegion", () => {
  it("remove espaços extras e quebras de linha", () => {
    expect(sanitizeRegion("  Arujá \n  Centro  ")).toBe("Arujá Centro");
  });
  it("limita o tamanho do texto", () => {
    expect(sanitizeRegion("a".repeat(200))).toHaveLength(80);
  });
  it("tira a pontuação final para não duplicar o ponto", () => {
    expect(sanitizeRegion("Arujá.")).toBe("Arujá");
  });
});

describe("buildDogMessage", () => {
  it("sem nenhuma informação, usa a mensagem genérica com interesse em saber mais", () => {
    expect(buildDogMessage({ problems: [] })).toBe(
      "Olá! Tenho interesse em saber mais sobre o adestramento para o meu cão.",
    );
  });

  it("com um problema, descreve-o e manifesta interesse em saber mais", () => {
    expect(buildDogMessage({ problems: ["puxa-na-guia"] })).toBe(
      "Olá! Meu cão puxa muito na guia durante os passeios. Tenho interesse em saber mais sobre o plano ideal para ele.",
    );
  });

  it("com vários problemas, segue a ordem da página, não a ordem de clique", () => {
    expect(buildDogMessage({ problems: ["ansiedade", "puxa-na-guia"] })).toBe(
      "Olá! Meu cão puxa muito na guia durante os passeios e fica muito ansioso e agitado. Tenho interesse em saber mais sobre o plano ideal para ele.",
    );
  });

  it("inclui fase de vida e bairro quando informados", () => {
    expect(buildDogMessage({ problems: ["nao-atende"], stage: "adulto", region: " Arujá, Centro " })).toBe(
      "Olá! Meu cão não atende aos comandos, nem quando eu chamo. Ele é adulto. Moro em Arujá, Centro. Tenho interesse em saber mais sobre o plano ideal para ele.",
    );
  });

  it("sem problemas mas com fase e bairro, mantém o interesse em saber mais", () => {
    expect(buildDogMessage({ problems: [], stage: "filhote", region: "Arujá" })).toBe(
      "Olá! Tenho interesse em saber mais sobre o adestramento para o meu cão. Ele é filhote. Moro em Arujá.",
    );
  });

  it("ignora identificadores desconhecidos", () => {
    expect(buildDogMessage({ problems: ["inexistente"], stage: "x" })).toBe(buildDogMessage({ problems: [] }));
  });
});
