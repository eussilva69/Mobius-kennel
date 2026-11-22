/**
 * Camada de medição de conversão (GA4 / Google Tag Manager).
 *
 * PRIVACIDADE: envie apenas identificadores técnicos (origem do botão, id do plano,
 * id da pergunta, etapa). Nunca envie nomes, telefones, região digitada ou
 * descrições do comportamento do cão como parâmetros.
 *
 * Um "whatsapp_click" mede o clique — não significa que a conversa foi iniciada.
 */
export type AnalyticsEvent =
  | "whatsapp_click"
  | "plan_select"
  | "quiz_start"
  | "quiz_complete"
  | "faq_open"
  | "instagram_click"
  | "scroll_depth";

export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

/** IDs públicos de medição, validados para evitar injeção em scripts inline. */
export function getAnalyticsIds() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const ga = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return {
    gtmId: gtm && /^GTM-[A-Z0-9]{4,12}$/.test(gtm) ? gtm : undefined,
    gaId: ga && /^G-[A-Z0-9]{4,14}$/.test(ga) ? ga : undefined,
  };
}
