import Image from "next/image";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** Fechamento: espelha o hero (dourado com bloco preto diagonal) e traz o adestrador com os dois cães. */
export function FinalCTA() {
  return (
    <section id="contato" aria-labelledby="cta-final-title" className="relative isolate overflow-hidden bg-gold text-ink">
      <div aria-hidden="true" className="diag-right absolute inset-y-0 right-0 -z-10 hidden w-[42%] bg-ink lg:block" />

      <div className="mx-auto grid max-w-[78rem] lg:min-h-[34rem] lg:grid-cols-[1.15fr_1fr]">
        <div className="px-5 py-16 sm:px-8 sm:py-20 lg:flex lg:flex-col lg:justify-center lg:px-10">
          <h2 id="cta-final-title" className="display text-h2">
            Vamos treinar o seu cão?
          </h2>
          <p className="mt-5 max-w-[32rem] text-lead text-ink/80">
            Atendemos {site.location.serviceArea}, de {site.hours.label.toLowerCase()}. Mande o seu bairro e confirmamos o
            atendimento.
          </p>
          <WhatsAppButton message={whatsappMessages.finalCta} source="final_cta" variant="ink" className="mt-8 w-full sm:w-auto sm:self-start">
            Chamar no WhatsApp
          </WhatsAppButton>
        </div>

        <div className="relative h-[22rem] sm:h-[26rem] lg:h-auto">
          <div aria-hidden="true" className="diag-right absolute inset-0 bg-ink lg:hidden" />
          <Image
            src={photos.teamCutout.src}
            alt={photos.teamCutout.alt}
            sizes="(min-width: 1024px) 420px, 300px"
            className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 lg:left-[52%]"
          />
        </div>
      </div>
    </section>
  );
}
