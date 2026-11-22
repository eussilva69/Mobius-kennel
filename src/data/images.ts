/**
 * Fotografias reais da Morbius Kennel (geradas por scripts/process-images.mjs).
 * Importações estáticas: dimensões e placeholder blur automáticos.
 */
import type { StaticImageData } from "next/image";

import logoEmblem from "../../public/images/morbius/brand/logo-emblem.png";
import heroCutout from "../../public/images/morbius/hero/adestrador-e-cao-recorte.webp";
import teamCutout from "../../public/images/morbius/hero/adestrador-dois-caes-recorte.webp";
import obediencia from "../../public/images/morbius/treinamentos/obediencia-cao-sentado.webp";
import passeio from "../../public/images/morbius/treinamentos/passeio-na-guia.webp";
import comportamento from "../../public/images/morbius/treinamentos/comportamento-rottweiler-maltes.webp";
import adestradorComCao from "../../public/images/morbius/profissionais/adestrador-com-cao.webp";

export type Photo = { src: StaticImageData; alt: string };

export const logo: Photo = { src: logoEmblem, alt: "Logotipo da Morbius Kennel" };

export const photos = {
  heroCutout: {
    src: heroCutout,
    alt: "Adestrador da Morbius Kennel sentado ao lado de um cão de grande porte, com a guia na mão.",
  },
  teamCutout: {
    src: teamCutout,
    alt: "Adestrador com dois cães sentados nas patas traseiras, atentos ao comando.",
  },
  obediencia: {
    src: obediencia,
    alt: "Cão branco sentado nas patas traseiras, atento, durante o treino em um gramado.",
  },
  passeio: {
    src: passeio,
    alt: "Adestrador conduz um pastor-alemão e um cão de pequeno porte na guia em um caminho de parque.",
  },
  comportamento: {
    src: comportamento,
    alt: "Adestrador caminha no gramado conduzindo um rottweiler e um maltês lado a lado na guia.",
  },
  adestradorComCao: {
    src: adestradorComCao,
    alt: "Adestrador agachado faz carinho no rosto de um cão de grande porte à beira de um lago.",
  },
} satisfies Record<string, Photo>;
