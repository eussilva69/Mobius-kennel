import Image from "next/image";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

/** PENDENTE: nome, formação e certificações do adestrador responsável (não inventar). */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-paper py-20 text-ink sm:py-28">
      <Container className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] w-full max-w-[30rem] overflow-hidden md:max-w-none">
          <Image
            src={photos.adestradorComCao.src}
            alt={photos.adestradorComCao.alt}
            placeholder="blur"
            fill
            sizes="(min-width: 1248px) 560px, (min-width: 768px) 45vw, 92vw"
            className="object-cover object-[45%_40%]"
          />
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-2 w-2/5 bg-gold" />
        </div>

        <div>
          <h2 id="sobre-title" className="display text-h2">
            Adestrador em Arujá
          </h2>
          <div className="mt-6 max-w-[34rem] space-y-4 text-lead text-ink-muted">
            <p>
              A {site.name} faz adestramento canino em domicílio. O treino acontece onde o cão vive: na porta de casa, na
              calçada, na hora da visita.
            </p>
            <p>Além de treinar o cão, orientamos a família para o treino continuar depois da aula.</p>
          </div>
          <p className="display mt-8 flex items-center gap-3 text-[0.95rem] tracking-[0.04em]">
            <span aria-hidden="true" className="h-0.5 w-8 bg-gold" />
            {site.slogan}
          </p>
          <ButtonLink
            href={site.instagram.url}
            external
            variant="ghostInk"
            icon={<InstagramIcon className="size-5 shrink-0" />}
            track={{ event: "instagram_click", source: "about" }}
            srHint="abre o Instagram em nova aba"
            className="mt-8"
          >
            Ver treinos no Instagram
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
