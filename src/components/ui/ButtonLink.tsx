import Link from "next/link";
import type { ReactNode } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";

/**
 * gold   — principal (dourado com texto preto)
 * ink    — preto (para usar sobre o dourado)
 * ghost  — contorno claro (sobre fundo escuro)
 * ghostInk — contorno escuro (sobre fundo claro/dourado)
 */
type Variant = "gold" | "ink" | "ghost" | "ghostInk";

export type TrackProps = {
  event: AnalyticsEvent;
  source?: string;
  plan?: string;
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  track?: TrackProps;
  /** Texto adicional só para leitores de tela (ex.: "abre o WhatsApp") */
  srHint?: string;
};

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-light",
  ink: "bg-ink text-fg hover:bg-ink-3",
  ghost: "border-2 border-fg/30 text-fg hover:border-fg",
  ghostInk: "border-2 border-ink/25 text-ink hover:border-ink",
};

export function ButtonLink({ href, children, variant = "gold", external = false, icon, className = "", track, srHint }: Props) {
  const props = {
    "data-track": track?.event,
    "data-source": track?.source,
    "data-plan": track?.plan,
    className: `btn inline-flex min-h-13 items-center justify-center gap-2.5 px-6 py-3 text-center text-[0.88rem] font-bold uppercase leading-tight tracking-[0.06em] [font-stretch:112%] transition-colors duration-200 ${variants[variant]} ${className}`,
  };
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {srHint ? <span className="sr-only"> ({srHint})</span> : null}
    </>
  );

  if (!external && href.startsWith("/")) {
    return (
      <Link prefetch={false} href={href} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {content}
    </a>
  );
}
