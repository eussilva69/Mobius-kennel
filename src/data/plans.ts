/**
 * Planos e preços informados pela empresa.
 * Descontos, economia mensal e totais são CALCULADOS a partir da referência avulsa (R$ 630/mês);
 * um teste garante que continuam batendo com os valores divulgados.
 *
 * PENDENTE (não inventar): aulas por mês, frequência, duração da aula,
 * forma de pagamento, regras de interrupção/reembolso e a modalidade exata do Avulso.
 */
export const REFERENCE_MONTHLY_PRICE = 630;

export type PlanId = "avulso" | "fundamentos" | "equilibrio" | "excelencia";

export type Plan = {
  id: PlanId;
  name: string;
  /** Para quem é — derivado dos temas do próprio plano */
  audience: string;
  /** Selo de destaque (só no plano em destaque) */
  badge?: string;
  /** Duração de referência; null = sem compromisso de continuidade */
  months: number | null;
  monthlyPrice: number;
  summary: string;
  topics: string[];
  cta: string;
  message: string;
  featured?: boolean;
  note?: string;
};

export const plans: Plan[] = [
  {
    id: "avulso",
    name: "Avulso",
    audience: "Para quem prefere sem período fechado",
    months: null,
    monthlyPrice: 630,
    summary: "Aulas conforme a necessidade, sem compromisso de continuidade.",
    topics: [],
    cta: "Consultar o Avulso",
    message: "Olá! Tenho interesse no plano Avulso (sem período fechado). Pode me explicar como funciona?",
  },
  {
    id: "fundamentos",
    name: "Fundamentos",
    audience: "Para começar do básico",
    months: 3,
    monthlyPrice: 600,
    summary: "Os comandos que todo cão deveria saber, treinados na sua casa.",
    topics: ["Senta, fica e vem", "Andar na guia", "Socialização básica"],
    cta: "Falar no WhatsApp",
    message: "Olá! Tenho interesse no plano de 3 meses (Fundamentos). Como faço para começar?",
    note: "Introdução estruturada aos comandos",
  },
  {
    id: "equilibrio",
    name: "Equilíbrio",
    audience: "Para ansiedade, reatividade e guia",
    badge: "Mais evolução",
    months: 5,
    monthlyPrice: 565,
    summary: "Obediência avançada e trabalho no comportamento.",
    topics: ["Obediência avançada", "Ansiedade e agitação", "Reatividade", "Puxar na guia"],
    cta: "Falar no WhatsApp",
    message: "Olá! Tenho interesse no plano de 5 meses (Equilíbrio). Podem me orientar sobre o início?",
    featured: true,
  },
  {
    id: "excelencia",
    name: "Excelência",
    audience: "Para rua, visitas e outros animais",
    months: 6,
    monthlyPrice: 530,
    summary: "Obediência e comportamento aplicados a situações reais.",
    topics: ["Na rua", "Com visitas em casa", "Convivência com outros animais"],
    cta: "Falar no WhatsApp",
    message: "Olá! Tenho interesse no plano de 6 meses (Excelência). Gostaria de saber mais detalhes sobre o treinamento.",
    note: "Menor mensalidade e o conteúdo mais amplo",
  },
];

export const processPlans = plans.filter((p) => p.months !== null);
export const avulsoPlan = plans.find((p) => p.id === "avulso")!;

/** Percentual abaixo da referência avulsa (0 para o próprio Avulso). */
export function planDiscountPercent(plan: Plan): number {
  return (1 - plan.monthlyPrice / REFERENCE_MONTHLY_PRICE) * 100;
}

/** Quanto se paga a menos por mês em relação ao Avulso. */
export function planMonthlySaving(plan: Plan): number {
  return REFERENCE_MONTHLY_PRICE - plan.monthlyPrice;
}

/** Total de referência do processo completo; null quando não há duração fechada. */
export function planTotal(plan: Plan): number | null {
  return plan.months ? plan.monthlyPrice * plan.months : null;
}

export const lowestMonthlyPrice = Math.min(...plans.map((p) => p.monthlyPrice));
