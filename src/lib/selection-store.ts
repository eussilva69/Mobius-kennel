/**
 * Estado mínimo compartilhado entre o seletor de problemas e o botão/barra fixa de WhatsApp:
 * quando o visitante marca situações, o contato fixo passa a enviar ESSA mensagem
 * (em vez da genérica), para a seleção não se perder ao rolar a página.
 * Só em memória — nada é salvo.
 */
export type Selection = { count: number; message: string };

const EMPTY: Selection = { count: 0, message: "" };
let current: Selection = EMPTY;
const listeners = new Set<() => void>();

export const selectionStore = {
  get: () => current,
  getServer: () => EMPTY,
  set(next: Selection) {
    current = next.count > 0 ? next : EMPTY;
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
