"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent, type AnalyticsParams } from "@/lib/analytics";

const TRACKED = new Set<AnalyticsEvent>(["whatsapp_click", "instagram_click", "plan_select"]);
const DEPTHS = [25, 50, 75, 100] as const;

/**
 * Medição por delegação: links/botões com data-track="evento" e data-source / data-plan.
 * Assim as seções continuam Server Components, sem JavaScript próprio.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      const event = el?.dataset.track as AnalyticsEvent | undefined;
      if (!el || !event || !TRACKED.has(event)) return;
      const params: AnalyticsParams = {};
      if (el.dataset.source) params.source = el.dataset.source;
      if (el.dataset.plan) {
        params.plan = el.dataset.plan;
        track("plan_select", { plan: el.dataset.plan });
      }
      track(event, params);
    };

    // "toggle" não borbulha: captura no documento para os <details> do FAQ
    const onToggle = (e: Event) => {
      const el = e.target;
      if (el instanceof HTMLDetailsElement && el.open && el.dataset.faqId) {
        track("faq_open", { question_id: el.dataset.faqId });
      }
    };

    const sent = new Set<number>();
    let ticking = false;
    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const depth of DEPTHS) {
        if (percent >= depth - 1 && !sent.has(depth)) {
          sent.add(depth);
          track("scroll_depth", { percent: depth });
        }
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
