import Image from "next/image";
import { photos, type Photo } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { ProblemSelector } from "./ProblemSelector";

const services: { title: string; text: string; photo: Photo; focus: string }[] = [
  {
    title: "Obediência",
    text: "Senta, fica, vem e junto, treinados na sua casa.",
    photo: photos.obediencia,
    focus: "50% 35%",
  },
  {
    title: "Passeio na guia",
    text: "O cão anda ao seu lado, sem arrastar você pela calçada.",
    photo: photos.passeio,
    focus: "50% 40%",
  },
  {
    title: "Comportamento",
    text: "Ansiedade, reatividade, visitas e convivência com outros animais.",
    photo: photos.comportamento,
    focus: "30% 50%",
  },
];

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-paper py-20 text-ink sm:py-28">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 id="servicos-title" className="display text-h2">
            O que treinamos
          </h2>
          <p className="max-w-[26rem] text-ink-muted">
            Adestramento canino em domicílio: as aulas acontecem onde o cão vive, com a família junto.
          </p>
        </div>

        {/* Celular: carrossel com rolagem lateral; desktop: três colunas */}
        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {services.map((s) => (
            <li key={s.title} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image
                  src={s.photo.src}
                  alt={s.photo.alt}
                  placeholder="blur"
                  fill
                  sizes="(min-width: 1248px) 390px, (min-width: 768px) 31vw, 78vw"
                  style={{ objectPosition: s.focus }}
                  className="object-cover"
                />
              </div>
              <h3 className="display mt-5 text-h3">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 sm:mt-20">
          <ProblemSelector />
        </div>
      </Container>
    </section>
  );
}
