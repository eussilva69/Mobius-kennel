import { avulsoPlan, processPlans } from "@/data/plans";
import { formatBRL } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { PricingCard } from "@/components/ui/PricingCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** 3 planos de processo + o Avulso numa linha (modalidade ainda a confirmar — CONTEXTO §8). */
export function Pricing() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="bg-ink py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 id="planos-title" className="display text-h2">
            Planos e preços
          </h2>
          <p className="max-w-[26rem] text-fg-muted">
            Preço por mês, com aulas no seu endereço. Quanto mais longo o plano, menor a mensalidade.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processPlans.map((plan) => (
            <li
              key={plan.id}
              // No celular/tablet o plano em destaque vem primeiro; a ordem do DOM continua a mesma.
              className={plan.featured ? "order-first md:col-span-2 lg:order-none lg:col-span-1" : ""}
            >
              <PricingCard plan={plan} />
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-5 border-2 border-line p-6 sm:p-7 md:flex-row md:items-center md:justify-between">
          <p className="text-fg">
            <span className="font-bold">Sem período fechado?</span> Plano {avulsoPlan.name}, {formatBRL(avulsoPlan.monthlyPrice)}
            /mês, com aulas conforme a necessidade.
          </p>
          <WhatsAppButton message={avulsoPlan.message} source="pricing_avulso" plan={avulsoPlan.id} variant="ghost" className="shrink-0">
            {avulsoPlan.cta}
          </WhatsAppButton>
        </div>

        <p className="mt-6 text-sm text-fg-muted">
          Quantidade e duração das aulas e forma de pagamento são combinadas no atendimento.
        </p>
      </Container>
    </section>
  );
}
