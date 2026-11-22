import type { ReactNode } from "react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { ButtonLink } from "./ButtonLink";
import { WhatsAppIcon } from "./BrandIcons";

type Props = {
  message: string;
  source: string;
  children: ReactNode;
  plan?: string;
  variant?: "gold" | "ink" | "ghost" | "ghostInk";
  className?: string;
};

/** CTA de conversão: abre o WhatsApp com mensagem contextualizada e registra a origem. */
export function WhatsAppButton({ message, source, children, plan, variant = "gold", className }: Props) {
  return (
    <ButtonLink
      href={createWhatsAppLink(message)}
      external
      variant={variant}
      className={className}
      icon={<WhatsAppIcon className="size-[1.15rem] shrink-0" />}
      track={{ event: "whatsapp_click", source, plan }}
      srHint="abre o WhatsApp em nova aba"
    >
      {children}
    </ButtonLink>
  );
}
