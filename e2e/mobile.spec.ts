import { expect, test } from "@playwright/test";
import { gotoHome, scrollPastTop } from "./helpers";

/** Só no projeto mobile (390x844, touch). */
test.describe("Celular", () => {
  test("CTA do hero aparece na primeira tela", async ({ page }) => {
    await gotoHome(page);
    const box = await page.locator('a[data-source="hero"]').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThan(844);
  });

  test("menu: abre, foca o primeiro link, Esc fecha e devolve o foco", async ({ page }) => {
    await gotoHome(page);
    const toggle = page.getByRole("button", { name: "Abrir menu" });
    await toggle.click();
    await expect(page.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
    const nav = page.getByRole("navigation", { name: "Menu", exact: true });
    await expect(nav.getByRole("link", { name: "Serviços", exact: true })).toBeFocused();
    await expect(page.locator("html")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
    await expect(nav).toBeHidden();
  });

  test("menu: link fecha o painel e leva à seção", async ({ page }) => {
    await gotoHome(page);
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.getByRole("navigation", { name: "Menu", exact: true }).getByRole("link", { name: "Planos", exact: true }).click();
    await expect(page).toHaveURL(/#planos$/);
    await expect(page.locator("#planos")).toBeInViewport();
  });

  test("menu aberto depois de rolar ocupa a tela (regressão do backdrop-filter)", async ({ page }) => {
    await gotoHome(page);
    await scrollPastTop(page);
    await page.getByRole("button", { name: "Abrir menu" }).click();
    const panelBox = await page.locator('[id] > nav[aria-label="Menu"]').locator("..").boundingBox();
    expect(panelBox!.height).toBeGreaterThan(400);
  });

  test("barra de WhatsApp: oculta no topo, aparece ao rolar; o ícone do header some", async ({ page }) => {
    await gotoHome(page);
    const bar = page.locator('a[data-source="floating_bar_mobile"]');
    const headerIcon = page.locator('a[data-source="navbar_mobile"]');
    await expect(bar).toBeHidden();
    await expect(headerIcon).toBeVisible();
    await scrollPastTop(page);
    await expect(bar).toBeVisible();
    await expect(bar).toContainText("Chamar no WhatsApp");
    await expect(headerIcon).toBeHidden();
  });
});
