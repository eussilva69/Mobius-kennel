"use client";

import { useSyncExternalStore } from "react";
import { createWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { selectionStore } from "@/lib/selection-store";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/**
 * Contato persistente, visível após o início da rolagem (data-scrolled):
 *  - Desktop e celulares em paisagem (tela baixa): botão circular no canto.
 *  - Celular/tablet em retrato: barra inferior (respeita a safe area).
 * Se o visitante marcou situações no seletor de problemas, o contato fixo envia ESSA mensagem.
 */
export function FloatingWhatsApp() {
  const selection = useSyncExternalStore(selectionStore.subscribe, selectionStore.get, selectionStore.getServer);
  const hasSelection = selection.count > 0;
  const href = createWhatsAppLink(hasSelection ? selection.message : whatsappMessages.floating);
  const label = hasSelection ? `Enviar minha seleção (${selection.count})` : "Chamar no WhatsApp";
  const source = hasSelection ? "floating_selection" : "floating_button";

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-source={source}
        className="group invisible fixed bottom-6 right-6 z-40 hidden size-15 translate-y-4 items-center justify-center rounded-full bg-gold text-ink opacity-0 shadow-[0_16px_36px_-12px_rgb(0_0_0/0.8)] transition-[opacity,translate,background-color,visibility] transition-discrete duration-300 hover:bg-gold-light lg:flex short:bottom-4 short:right-4 short:flex short:size-13 scrolled:visible scrolled:translate-y-0 scrolled:opacity-100"
      >
        <WhatsAppIcon className="size-7" />
        {hasSelection ? (
          <span className="absolute -right-1 -top-1 inline-flex size-6 items-center justify-center rounded-full bg-fg text-xs font-bold text-ink">
            {selection.count}
          </span>
        ) : null}
        <span className="sr-only">{label} (abre o WhatsApp em nova aba)</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-ink px-3 py-1.5 text-sm font-semibold text-fg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      </a>

      <div className="invisible fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-line bg-ink/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-[translate,visibility] transition-discrete duration-300 lg:hidden short:hidden scrolled:visible scrolled:translate-y-0">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-source={hasSelection ? "floating_bar_selection" : "floating_bar_mobile"}
          className="mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-2.5 bg-gold px-5 text-[0.88rem] font-bold uppercase tracking-[0.06em] text-ink [font-stretch:112%] transition-colors hover:bg-gold-light"
        >
          <WhatsAppIcon className="size-5" />
          {label}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
    </>
  );
}
