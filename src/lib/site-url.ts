/**
 * URL pública oficial do site Morbius Kennel.
 * Ordem de prioridade:
 *  1. NEXT_PUBLIC_SITE_URL (domínio explícito)
 *  2. VERCEL_PROJECT_PRODUCTION_URL (definida automaticamente pela Vercel)
 *  3. Fallback de produção/CI: https://www.morbiuskennel.com.br
 *  4. localhost em desenvolvimento local
 */
export const OFFICIAL_DOMAIN = "https://www.morbiuskennel.com.br";

export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  if (process.env.NODE_ENV === "production" || process.env.CI) {
    return new URL(OFFICIAL_DOMAIN);
  }
  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}
