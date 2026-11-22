import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { createWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";

/** Acordeão com <details>/<summary> nativos: teclado e leitores de tela funcionam sem JavaScript. */
export function FAQ() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="bg-ink py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <h2 id="duvidas-title" className="display text-h2">
            Dúvidas
          </h2>
          <p className="mt-5 text-fg-muted">
            Não achou o que queria saber?{" "}
            <a
              href={createWhatsAppLink(whatsappMessages.faq)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-source="faq"
              className="inline-flex min-h-11 items-center font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            >
              Pergunte no WhatsApp
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </div>

        <div className="border-t-2 border-fg/80">
          {faqs.map((faq) => (
            <details key={faq.id} data-faq-id={faq.id} className="accordion group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-left">
                <h3 className="text-[1.08rem] font-bold text-fg transition-colors group-hover:text-gold sm:text-[1.15rem]">
                  {faq.question}
                </h3>
                <span className="inline-flex size-9 shrink-0 items-center justify-center bg-ink-3 text-gold transition-colors group-open:bg-gold group-open:text-ink">
                  <Plus aria-hidden="true" className="accordion-icon size-4 transition-[rotate] duration-300" strokeWidth={2.5} />
                </span>
              </summary>
              <p className="max-w-[40rem] pb-6 pr-12 text-fg-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
