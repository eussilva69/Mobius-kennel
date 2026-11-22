import { lifeStages, problems, REGION_MAX_LENGTH } from "@/data/problems";

/** ["a","b","c"] -> "a, b e c" */
export function joinPt(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

export function sanitizeRegion(input: string): string {
  return input.replace(/\s+/g, " ").trim().slice(0, REGION_MAX_LENGTH).replace(/[.!?]+$/, "");
}

export type DogDetails = {
  problems: readonly string[];
  stage?: string;
  region?: string;
};

const GENERIC = "Olá! Tenho interesse em saber mais sobre o adestramento para o meu cão.";

/**
 * Monta a mensagem de WhatsApp a partir da seleção do visitante.
 * Organiza a conversa para o atendimento contextualizado.
 */
export function buildDogMessage({ problems: ids, stage, region }: DogDetails): string {
  const selected = problems.filter((p) => ids.includes(p.id));
  const stageSentence = lifeStages.find((s) => s.value === stage)?.sentence;
  const place = region ? sanitizeRegion(region) : "";

  const parts: string[] = [];
  parts.push(selected.length ? `Olá! Meu cão ${joinPt(selected.map((p) => p.phrase))}.` : GENERIC);
  if (stageSentence) parts.push(stageSentence);
  if (place) parts.push(`Moro em ${place}.`);
  if (selected.length) parts.push("Tenho interesse em saber mais sobre o plano ideal para ele.");
  return parts.join(" ");
}
