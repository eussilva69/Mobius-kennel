import { expect, test } from "@playwright/test";
import { decodeWa, gotoHome, scrollPastTop } from "./helpers";

const GENERIC = "Olá! Queria orientação sobre o adestramento do meu cão.";

/** Roda no desktop (1440) e no mobile (390). */
test.describe("Seletor 'Qual é o caso do seu cão?'", () => {
  test("monta a mensagem na ordem da página e volta ao genérico ao desmarcar", async ({ page }) => {
    await gotoHome(page);
    const chips = page.locator("#servicos button[aria-pressed]");
    await expect(chips).toHaveCount(6);
    const send = page.locator('a[data-source="problem_section"]');
    expect(decodeWa(await send.getAttribute("href"))).toBe(GENERIC);

    const ansiedade = page.getByRole("button", { name: "Ansiedade", exact: true });
    const guia = page.getByRole("button", { name: "Puxa na guia", exact: true });
    await ansiedade.click();
    await guia.click();
    await expect(guia).toHaveAttribute("aria-pressed", "true");
    await expect
      .poll(async () => decodeWa(await send.getAttribute("href")))
      .toBe(
        "Olá! Meu cão puxa muito na guia durante os passeios e fica muito ansioso e agitado. Queria entender como funciona o adestramento.",
      );

    await ansiedade.click();
    await guia.click();
    await expect.poll(async () => decodeWa(await send.getAttribute("href"))).toBe(GENERIC);
  });

  test("registra quiz_start e quiz_complete", async ({ page }) => {
    await gotoHome(page);
    await page.getByRole("button", { name: "Bagunça em casa", exact: true }).click();
    await page.locator('a[data-source="problem_section"]').click();
    const events = await page.evaluate(() => ((window as unknown as { dataLayer?: Array<{ event?: string }> }).dataLayer ?? []).map((e) => e.event));
    expect(events).toContain("quiz_start");
    expect(events).toContain("quiz_complete");
    expect(events).toContain("whatsapp_click");
  });

  test("a seleção passa para o contato fixo da página", async ({ page, isMobile }) => {
    await gotoHome(page);
    await page.getByRole("button", { name: "Puxa na guia", exact: true }).click();
    await scrollPastTop(page);

    const fixed = isMobile ? page.locator('a[data-source="floating_bar_selection"]') : page.locator('a[data-source="floating_selection"]');
    await expect(fixed).toBeVisible();
    await expect(fixed).toContainText(isMobile ? "Enviar minha seleção (1)" : "");
    expect(decodeWa(await fixed.getAttribute("href"))).toContain("puxa muito na guia");
  });
});
