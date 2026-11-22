import { formatBRL } from "@/lib/format";
import { lowestMonthlyPrice, plans } from "./plans";
import { site } from "./site";

export type Faq = { id: string; question: string; answer: string };

const highest = Math.max(...plans.map((p) => p.monthlyPrice));

/**
 * Só o essencial, com fatos confirmados (alimenta também o JSON-LD FAQPage).
 */
export const faqs: Faq[] = [
  {
    id: "aulas-em-casa",
    question: "As aulas são na minha casa?",
    answer: `Sim. O adestrador vai até o seu endereço, em ${site.location.serviceArea}. Antes de começar, confirmamos se atendemos o seu bairro.`,
  },
  {
    id: "valores",
    question: "Quanto custa?",
    answer: `De ${formatBRL(lowestMonthlyPrice)} a ${formatBRL(highest)} por mês, conforme o plano. Quanto mais longo o plano, menor a mensalidade.`,
  },
  {
    id: "cao-adulto",
    question: "Meu cão já é adulto. Ainda dá para treinar?",
    answer: "Dá, sim. Atendemos filhotes, adultos e idosos. O que trabalhar em cada caso é combinado antes de começar.",
  },
  {
    id: "prazo-resultados",
    question: "Em quanto tempo vejo resultado?",
    answer:
      "Depende do cão e de quanto a família pratica entre as aulas. A duração dos planos é uma referência, não uma garantia.",
  },
  {
    id: "horario",
    question: "Qual é o horário de atendimento?",
    answer: `${site.hours.label}. Pelo WhatsApp você pode mandar mensagem quando quiser.`,
  },
];
