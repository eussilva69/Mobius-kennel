import { expect, type Page } from "@playwright/test";

export const WHATSAPP_NUMBER = "5511920425303";
export const INSTAGRAM_URL = "https://www.instagram.com/morbius.kennel/";

/** Mesma regra de src/lib/whatsapp.ts */
export const waLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Abre a home sem deixar o teste sair para wa.me/instagram e coleta erros. */
export async function gotoHome(page: Page) {
  const problems: string[] = [];
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
  page.on("response", (r) => {
    if (r.status() >= 400 && new URL(r.url()).origin === new URL(page.url() || r.url()).origin) {
      problems.push(`HTTP ${r.status()} ${r.url()}`);
    }
  });
  await page.route(/wa\.me|instagram\.com/, (route) => route.abort());
  await page.goto("/", { waitUntil: "networkidle" });
  return problems;
}

/** Rola até disparar o estado "scrolled" (sentinela de 160px). */
export async function scrollPastTop(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(page.locator("html")).toHaveAttribute("data-scrolled", "");
}

export function decodeWa(href: string | null) {
  if (!href) return "";
  const text = new URL(href).searchParams.get("text");
  return text ?? "";
}
