import Image from "next/image";
import { publishedTestimonials, type Testimonial } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";

/**
 * Relatos reais e AUTORIZADOS de tutores (src/data/testimonials.ts).
 * Sem nenhum relato cadastrado, a seção não é exibida — nada de depoimento fictício.
 */
export function Results() {
  if (publishedTestimonials.length === 0) return null;

  return (
    <section id="resultados" aria-labelledby="resultados-title" className="bg-ink py-20 sm:py-28">
      <Container>
        <h2 id="resultados-title" className="display text-h2">
          O que dizem os tutores
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publishedTestimonials.map((t) => (
            <li key={t.id}>
              <ResultCard testimonial={t} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ResultCard({ testimonial: t }: { testimonial: Testimonial }) {
  const names = [t.dogName, t.tutorName && `tutor(a): ${t.tutorName}`].filter(Boolean).join(" · ");
  return (
    <article className="flex h-full flex-col bg-ink-2">
      {t.video ? (
        <video controls preload="none" playsInline poster={t.video.poster} className="aspect-[4/5] w-full bg-black object-cover">
          <source src={t.video.src} />
          {t.video.title}
        </video>
      ) : t.image ? (
        <Image
          src={t.image.src}
          alt={t.image.alt}
          placeholder="blur"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="aspect-[4/5] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {names ? <h3 className="display text-h3">{names}</h3> : null}
        {t.quote ? <blockquote className="mt-4 text-fg">“{t.quote}”</blockquote> : null}
        <p className="mt-4 text-sm text-fg-muted">
          {t.challenge} {t.training} {t.evolution}
        </p>
      </div>
    </article>
  );
}
