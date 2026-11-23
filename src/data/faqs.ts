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
  {
    id: "racas-e-portes",
    question: "Vocês atendem cães de grande porte ou raças consideradas reativas (como Pitbull, Pastor Alemão e Rottweiler)?",
    answer:
      "Sim. Atendemos cães de todos os portes e raças. O treinamento é adaptado ao temperamento, histórico e nível de energia de cada cão, priorizando equilíbrio, foco no tutor e liderança clara sem agressividade.",
  },
  {
    id: "filhotes-mordidas-xixi",
    question: "O adestramento ajuda com filhotes que mordem as mãos e fazem necessidades no lugar errado?",
    answer:
      "Sim. Para filhotes, trabalhamos a educação sanitária (xixi e cocô no lugar correto), inibição de mordidas de brincadeira e manejo inicial dentro de casa, prevenindo problemas graves na fase adulta.",
  },
  {
    id: "condominios-aruja",
    question: "Vocês atendem dentro de condomínios fechados em Arujá e região?",
    answer:
      "Sim. As aulas são domiciliares, atendendo condomínios e residências de Arujá (como Arujá 5, Arujá Hills, Arujazinho, Real Park, etc.), Santa Isabel, Mogi das Cruzes, Guarulhos e Alto Tietê.",
  },
];
