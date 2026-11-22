/**
 * URL pública do site. Ordem de prioridade:
 *  1. NEXT_PUBLIC_SITE_URL (domínio oficial — PENDENTE de definição)
 *  2. VERCEL_PROJECT_PRODUCTION_URL (definida automaticamente pela Vercel)
 *  3. localhost em desenvolvimento
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  // Em build de CI/hospedagem sem domínio definido, falhar é melhor que publicar canonical/sitemap em localhost.
  if (process.env.CI) {
    throw new Error("Defina NEXT_PUBLIC_SITE_URL: canonical, sitemap e JSON-LD apontariam para localhost.");
  }
  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}
