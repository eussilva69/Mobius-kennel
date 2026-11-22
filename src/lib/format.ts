const brl = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** "R$ 1.800" — valores inteiros, sem centavos. */
export const formatBRL = (value: number) => `R$ ${brl.format(value)}`;

/** "4,76%" */
export const formatPercent = (value: number) => `${pct.format(value)}%`;
