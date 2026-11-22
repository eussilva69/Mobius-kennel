import type { StaticImageData } from "next/image";

/**
 * Provas sociais REAIS e AUTORIZADAS.
 *
 * Regras:
 *  - Nunca inventar depoimentos, nomes, notas ou números.
 *  - Só inclua o nome do tutor e/ou do cão se houver autorização registrada (`authorized: true`).
 *  - Descreva a evolução de forma objetiva, sem promessas ou exageros.
 *
 * Enquanto a lista estiver vazia, a seção "Resultados" exibe o convite para acompanhar
 * os treinos reais no Instagram oficial, sem publicar depoimentos fictícios.
 *
 * Exemplo de item (preencher apenas com dados reais):
 * {
 *   id: "thor-passeio",
 *   authorized: true,
 *   dogName: "Thor",
 *   tutorName: "Nome autorizado",
 *   challenge: "Puxava muito durante os passeios.",
 *   training: "Exercícios de condução na guia e atenção ao tutor.",
 *   evolution: "Passeios mais tranquilos no bairro, segundo o tutor.",
 *   image: { src: importedImage, alt: "Descrição da foto" },
 * }
 */
export type Testimonial = {
  id: string;
  /** Precisa ser true para o item ser exibido. */
  authorized: boolean;
  dogName?: string;
  tutorName?: string;
  challenge: string;
  training: string;
  evolution: string;
  quote?: string;
  image?: { src: StaticImageData; alt: string };
  /** Vídeo hospedado em /public (ex.: /videos/resultado.mp4) com poster */
  video?: { src: string; poster: string; title: string };
};

export const testimonials: Testimonial[] = [];

export const publishedTestimonials = testimonials.filter((t) => t.authorized);
