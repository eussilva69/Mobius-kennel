"use client";

import { useEffect, useRef } from "react";

/**
 * Marca <html data-scrolled> quando o visitante sai do topo da página.
 * Header, botão flutuante e barra mobile reagem via CSS (variante `scrolled:`).
 */
export function ScrollState() {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      document.documentElement.toggleAttribute("data-scrolled", !entry?.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40" />;
}
