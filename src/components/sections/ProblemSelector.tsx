"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { problems } from "@/data/problems";
import { track } from "@/lib/analytics";
import { buildDogMessage } from "@/lib/messages";
import { selectionStore } from "@/lib/selection-store";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Seletor de problemas do cão.
 * Layout mobile em grade uniforme de 1 coluna (área de toque total conforme Lei de Fitts e alinhamento Prägnanz),
 * expandindo para 2 colunas em tablet e 3 colunas em desktop.
 */
export function ProblemSelector() {
  const [selected, setSelected] = useState<string[]>([]);
  const started = useRef(false);

  const message = buildDogMessage({ problems: selected });
  const count = selected.length;

  useEffect(() => {
    selectionStore.set({ count, message });
  }, [count, message]);
  useEffect(() => () => selectionStore.set({ count: 0, message: "" }), []);

  const toggle = (id: string) => {
    if (!started.current) {
      started.current = true;
      track("quiz_start");
    }
    setSelected((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));
  };

  return (
    <div className="bg-ink p-5 text-fg sm:p-8 lg:p-10">
      <div className="sm:flex sm:items-end sm:justify-between sm:gap-6">
        <div>
          <h3 className="display text-h2">Qual é o caso do seu cão?</h3>
          <p id="caso-instrucao" className="mt-3 max-w-[36rem] text-sm text-fg-muted sm:text-base">
            Toque no que acontece aí. A mensagem para o WhatsApp vai pronta com a sua escolha.
          </p>
        </div>
        <p className="mt-3 text-sm font-semibold text-gold sm:mt-0 shrink-0" aria-live="polite">
          {count === 0 ? "Nenhuma opção marcada" : count === 1 ? "1 selecionado" : `${count} selecionados`}
        </p>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3" aria-describedby="caso-instrucao">
        {problems.map((problem) => {
          const active = selected.includes(problem.id);
          return (
            <li key={problem.id} className="w-full">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => toggle(problem.id)}
                className={`group flex w-full min-h-[52px] items-center justify-between gap-3 border-2 px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                  active
                    ? "border-gold bg-gold/15 text-fg shadow-[0_0_15px_-3px_rgba(212,162,76,0.2)]"
                    : "border-fg/15 bg-ink-2/60 text-fg hover:border-fg/40 hover:bg-ink-2"
                }`}
              >
                <span className="text-[0.95rem] font-semibold leading-snug">
                  {problem.short}
                </span>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center border transition-colors ${
                    active ? "border-gold bg-gold text-ink" : "border-fg/30 bg-transparent group-hover:border-fg/60"
                  }`}
                  aria-hidden="true"
                >
                  {active ? <Check className="size-3.5 stroke-[3]" /> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8" onClickCapture={() => count > 0 && track("quiz_complete")}>
        <WhatsAppButton message={message} source="problem_section" className="w-full sm:w-auto">
          Enviar pelo WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  );
}
