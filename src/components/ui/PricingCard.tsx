import { planDiscountPercent, planTotal, type Plan } from "@/data/plans";
import { formatBRL, formatPercent } from "@/lib/format";
import { WhatsAppButton } from "./WhatsAppButton";

/** Card de plano. O plano em destaque é o único dourado. Mesma ordem de informação em todos. */
export function PricingCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.featured);
  const total = planTotal(plan);
  const titleId = `plano-${plan.id}`;
  const muted = featured ? "text-ink/75" : "text-fg-muted";
  const line = featured ? "border-ink/20" : "border-line";

  return (
    <article
      aria-labelledby={titleId}
      className={`relative flex h-full flex-col p-7 sm:p-8 ${featured ? "bg-gold text-ink" : "bg-ink-2 text-fg"}`}
    >
      {plan.badge ? (
        <span className="absolute right-0 top-0 whitespace-nowrap bg-ink px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-gold">
          {plan.badge}
        </span>
      ) : null}
      <h3 id={titleId} className="display pt-3 text-[1.55rem] leading-none">
        {plan.name}
      </h3>
      <p className={`mt-2 text-[0.95rem] ${muted}`}>{plan.audience}</p>

      <p className="mt-7 flex items-baseline gap-1.5">
        <span className="display text-[2.9rem] leading-none">{formatBRL(plan.monthlyPrice)}</span>
        <span className={`text-sm font-semibold ${muted}`}>/mês</span>
      </p>
      <p className={`mt-2 text-sm ${muted}`}>
        {plan.months} meses · total {total ? formatBRL(total) : ""} · {formatPercent(planDiscountPercent(plan))} de desconto
      </p>

      <ul className={`mt-7 flex-1 border-t ${line}`}>
        {plan.topics.map((topic) => (
          <li key={topic} className={`border-b py-3 text-[0.97rem] ${line}`}>
            {topic}
          </li>
        ))}
      </ul>

      <WhatsAppButton
        message={plan.message}
        source={`pricing_${plan.id}`}
        plan={plan.id}
        variant={featured ? "ink" : "ghost"}
        className="mt-8 w-full"
      >
        {plan.cta}
        <span className="sr-only"> sobre o plano {plan.name}</span>
      </WhatsAppButton>
    </article>
  );
}
