import { expect, test } from "@playwright/test";
import { gotoHome, scrollPastTop } from "./helpers";

const viewports: Array<[number, number]> = [
  [320, 568],
  [360, 740],
  [375, 667],
  [390, 844],
  [430, 932],
  [667, 375],
  [844, 390],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
];

/** Só no projeto desktop; o tamanho da tela muda em cada caso. */
test.describe("Responsividade", () => {
  for (const [w, h] of viewports) {
    test(`sem rolagem horizontal em ${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await gotoHome(page);
      const { scroll, client } = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(scroll).toBeLessThanOrEqual(client);
    });
  }

  test("celular deitado (844x390): botão redondo no lugar da barra inferior", async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    await gotoHome(page);
    await scrollPastTop(page);
    await expect(page.locator('a[data-source="floating_bar_mobile"]')).toBeHidden();
    await expect(page.locator('a[data-source="floating_button"]')).toBeVisible();
  });

  test("desktop: botão redondo só aparece depois da rolagem", async ({ page }) => {
    await gotoHome(page);
    const round = page.locator('a[data-source="floating_button"]');
    await expect(round).toBeHidden();
    await scrollPastTop(page);
    await expect(round).toBeVisible();
  });
});
