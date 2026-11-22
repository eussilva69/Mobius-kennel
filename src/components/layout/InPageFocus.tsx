"use client";

import { useEffect } from "react";

/**
 * A navegação por âncora do next/link rola até a seção, mas não move o foco.
 * Este listener leva o foco para a seção de destino, para o próximo Tab continuar dali
 * (essencial quando o link clicado some, como no menu mobile).
 */
export function InPageFocus() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash.length < 2) return;
      const id = decodeURIComponent(url.hash.slice(1));
      window.setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, 0);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
