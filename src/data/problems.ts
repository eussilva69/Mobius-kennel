export type ProblemIcon = "footprints" | "ear" | "activity" | "zap" | "users" | "house";

export type Problem = {
  id: string;
  title: string;
  /** Rótulo curto para o seletor em formato de botões */
  short: string;
  /** Cena reconhecível pelo tutor — descreve o problema, não promete resultado. */
  description: string;
  /** Trecho da mensagem de WhatsApp: "Meu cão {phrase}." */
  phrase: string;
  icon: ProblemIcon;
};

export const problems: Problem[] = [
  {
    id: "puxa-na-guia",
    title: "Puxa na guia",
    short: "Puxa na guia",
    description: "Você é arrastado pela calçada e volta do passeio com o braço cansado.",
    phrase: "puxa muito na guia durante os passeios",
    icon: "footprints",
  },
  {
    id: "nao-atende",
    title: "Não atende quando é chamado",
    short: "Não atende ao chamado",
    description: "Você chama, repete o nome, e ele segue farejando o quintal como se não fosse com ele.",
    phrase: "não atende aos comandos, nem quando eu chamo",
    icon: "ear",
  },
  {
    id: "ansiedade",
    title: "Ansiedade e agitação",
    short: "Ansiedade",
    description: "Não sossega, chora quando fica sozinho ou fica elétrico com qualquer barulho.",
    phrase: "fica muito ansioso e agitado",
    icon: "activity",
  },
  {
    id: "late-e-avanca",
    title: "Late e avança na rua",
    short: "Late e avança na rua",
    description: "Basta ver outro cão, uma moto ou um desconhecido para latir e puxar. Isso tem nome: reatividade.",
    phrase: "late e avança quando vê outros cães ou pessoas",
    icon: "zap",
  },
  {
    id: "estranha",
    title: "Estranha cães e pessoas",
    short: "Estranha cães e pessoas",
    description: "Fica tenso, rosna ou se esconde perto de outros cães, de crianças ou de quem não conhece.",
    phrase: "estranha outros cães e pessoas",
    icon: "users",
  },
  {
    id: "em-casa",
    title: "Dá trabalho dentro de casa",
    short: "Bagunça em casa",
    description: "Pula em quem chega, late quando toca a campainha, sobe no sofá, mexe no lixo.",
    phrase: "dá trabalho dentro de casa",
    icon: "house",
  },
];

/** Fases de vida (opcionais) para completar a mensagem. */
export const lifeStages = [
  { value: "filhote", label: "Filhote", sentence: "Ele é filhote." },
  { value: "adulto", label: "Adulto", sentence: "Ele é adulto." },
  { value: "idoso", label: "Idoso", sentence: "Ele já é idoso." },
] as const;

export const REGION_MAX_LENGTH = 80;
