import { whatsappMessages } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const steps = [
  { title: "Você chama no WhatsApp", text: "Conta o que acontece com o cão e em que bairro mora." },
  { title: "Combinamos o plano", text: "Pela rotina do cão e pelo que você quer mudar." },
  { title: "Aulas na sua casa", text: "Você participa e aprende a manter o treino no dia a dia." },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="bg-gold py-20 text-ink sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="como-funciona-title" className="display text-h2">
            Como funciona
          </h2>
          <div className="mt-8 hidden lg:block">
            <WhatsAppButton message={whatsappMessages.howItWorks} source="how_it_works" variant="ink">
              Começar agora
            </WhatsAppButton>
          </div>
        </div>

        <ol className="border-t-2 border-ink">
          {steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b-2 border-ink/15 py-6 sm:grid-cols-[5rem_1fr] sm:py-7">
              <span className="display text-[2.6rem] leading-none sm:text-[3.4rem]" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <span className="sr-only">Passo {i + 1}: </span>
                <h3 className="display text-h3">{step.title}</h3>
                <p className="mt-1.5 text-ink/80">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <WhatsAppButton message={whatsappMessages.howItWorks} source="how_it_works" variant="ink" className="w-full sm:w-auto sm:justify-self-start lg:hidden">
          Começar agora
        </WhatsAppButton>
      </Container>
    </section>
  );
}
