"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Menu mobile (padrão dialog/disclosure do WAI-ARIA).
 *  - Posicionamento fixo direto abaixo do header (--header-h).
 *  - Backdrop clicável para fechar ao tocar fora.
 *  - Tecla Escape, clique em link ou transição para desktop fecham o menu.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      buttonRef.current?.focus();
    }
  }, []);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // Foco inicial no primeiro link do menu
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) close(false);
    };

    document.addEventListener("keydown", onKey);
    desktopQuery.addEventListener("change", onResize);

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      desktopQuery.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        onClick={toggle}
        className="inline-flex size-11 items-center justify-center border-2 border-fg/25 bg-ink text-fg transition-colors hover:border-fg active:scale-95 cursor-pointer"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
      </button>

      {/* Backdrop semi-transparente para fechar ao tocar fora */}
      {open ? (
        <div
          aria-hidden="true"
          onClick={() => close(false)}
          className="fixed inset-0 top-[var(--header-h)] z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        />
      ) : null}

      {/* Painel de navegação */}
      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 overflow-y-auto border-t border-line bg-ink transition-transform duration-200 ${
          open ? "block" : "hidden"
        }`}
      >
        <nav
          aria-label="Navegação mobile"
          className="mx-auto flex min-h-full max-w-[78rem] flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-4 sm:px-8"
        >
          <ul className="divide-y divide-line border-b border-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  prefetch={false}
                  href={item.href}
                  onClick={() => close(false)}
                  className="display flex min-h-16 items-center text-[1.4rem] text-fg transition-colors hover:text-gold active:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4">
            <WhatsAppButton message={whatsappMessages.header} source="mobile_menu" className="w-full">
              Chamar no WhatsApp
            </WhatsAppButton>
            <p className="text-center text-sm text-fg-muted">
              {site.hours.label}
              <br />
              {site.location.serviceArea}
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
}
