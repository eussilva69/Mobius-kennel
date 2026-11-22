import Image from "next/image";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Hero: fundo preto, bloco diagonal dourado e o adestrador com o cão em recorte,
 * apoiados na base da seção. No celular a imagem vem logo abaixo do texto.
 */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink">
      {/* Bloco dourado: no desktop vai até a borda direita da tela */}
      <div aria-hidden="true" className="diag-right absolute inset-y-0 right-0 -z-10 hidden w-[40%] bg-gold short:block lg:block" />

      <div className="mx-auto grid max-w-[78rem] short:min-h-[calc(100svh-var(--header-h))] short:grid-cols-[1.2fr_1fr] lg:min-h-[min(46rem,calc(100svh-var(--header-h)))] lg:grid-cols-[1.1fr_1fr]">
        <div className="px-5 pb-10 pt-10 sm:px-8 sm:pt-14 short:flex short:flex-col short:justify-center short:py-6 lg:flex lg:flex-col lg:justify-center lg:px-10 lg:py-20">
          <h1 id="hero-title" className="hero-in display text-hero text-fg [--i:0]">
            Adestramento de cães em Arujá
          </h1>
          <p className="hero-in mt-6 max-w-[34rem] text-lead text-fg-muted [--i:1]">
            O adestrador vai até a sua casa. Do comando básico ao comportamento, com você aprendendo junto.
          </p>

          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row [--i:2]">
            <WhatsAppButton message={whatsappMessages.hero} source="hero">
              Chamar no WhatsApp
            </WhatsAppButton>
            <ButtonLink href="/#planos" variant="ghost">
              Ver planos
            </ButtonLink>
          </div>

          <p className="hero-in mt-7 flex flex-col gap-1 text-sm text-fg-muted sm:flex-row sm:items-center sm:gap-4 [--i:3]">
            <span>{site.hours.short}</span>
            <span aria-hidden="true" className="hidden h-3.5 w-px bg-fg/25 sm:block" />
            <span>Atendimento em domicílio</span>
          </p>
        </div>

        <div className="hero-figure relative h-[min(25rem,92vw)] sm:h-[28rem] short:h-auto lg:h-auto">
          <div aria-hidden="true" className="diag-right absolute inset-0 bg-gold short:hidden lg:hidden" />
          <Image
            src={photos.heroCutout.src}
            alt={photos.heroCutout.alt}
            preload
            sizes="(min-width: 1024px) 560px, 360px"
            className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 lg:left-[51%] lg:h-[90%]"
          />
        </div>
      </div>
    </section>
  );
}
