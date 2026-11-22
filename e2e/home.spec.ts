import { expect, test } from "@playwright/test";
import { INSTAGRAM_URL, WHATSAPP_NUMBER, decodeWa, gotoHome, waLink } from "./helpers";

/** Roda no desktop (1440) e no mobile (390). */
test.describe("Home — estrutura e conversão", () => {
  test("um único H1 com a palavra-chave e as seções na ordem certa", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(/Adestramento de cães em Arujá/i);

    const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual(["inicio", "servicos", "como-funciona", "planos", "sobre", "duvidas", "contato"]);
  });

  test("sem erros de console nem requisições com falha", async ({ page }) => {
    const problems = await gotoHome(page);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    expect(problems).toEqual([]);
  });

  test("todo link de WhatsApp usa o número oficial, abre em nova aba e é rastreado", async ({ page }) => {
    await gotoHome(page);
    const links = page.locator('a[href^="https://wa.me/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(8);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toMatch(new RegExp(`^https://wa\\.me/${WHATSAPP_NUMBER}\\?text=.+`));
      expect(decodeWa(href)).toMatch(/^Olá!/);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("data-track", "whatsapp_click");
      expect(await link.getAttribute("data-source")).toBeTruthy();
    }
  });

  test("CTA principal do hero leva a mensagem do hero", async ({ page }) => {
    await gotoHome(page);
    const cta = page.locator('a[data-source="hero"]');
    await expect(cta).toContainText("Chamar no WhatsApp");
    await expect(cta).toHaveAttribute("href", waLink("Olá! Queria saber como funciona o adestramento de vocês."));
  });

  test("planos: três cards com preço, duração, total e desconto; Equilíbrio em destaque; Avulso à parte", async ({ page }) => {
    await gotoHome(page);
    const section = page.locator("#planos");
    const expected = [
      { id: "fundamentos", price: "R$ 600", line: "3 meses · total R$ 1.800 · 4,76% de desconto" },
      { id: "equilibrio", price: "R$ 565", line: "5 meses · total R$ 2.825 · 10,32% de desconto" },
      { id: "excelencia", price: "R$ 530", line: "6 meses · total R$ 3.180 · 15,87% de desconto" },
    ];
    for (const plan of expected) {
      const card = section.locator(`article[aria-labelledby="plano-${plan.id}"]`);
      await expect(card).toContainText(plan.price);
      await expect(card).toContainText(plan.line);
      await expect(card.locator(`a[data-plan="${plan.id}"]`)).toHaveAttribute("data-source", `pricing_${plan.id}`);
    }
    await expect(section.locator('article[aria-labelledby="plano-equilibrio"]')).toContainText("Mais evolução");
    await expect(section).toContainText("R$ 630");
    await expect(section.locator('a[data-plan="avulso"]')).toContainText("Consultar o Avulso");
  });

  test("dúvidas: 6 itens nativos, abrem ao clicar e a resposta de preço bate com os planos", async ({ page }) => {
    await gotoHome(page);
    const items = page.locator("#duvidas details");
    await expect(items).toHaveCount(6);
    const price = page.locator('#duvidas details[data-faq-id="valores"]');
    await price.locator("summary").click();
    await expect(price).toHaveAttribute("open", "");
    await expect(price).toContainText("R$ 530");
    await expect(price).toContainText("R$ 630");
    const events = await page.evaluate(() => (window.dataLayer ?? []) as Array<Record<string, unknown>>);
    expect(events).toContainEqual(expect.objectContaining({ event: "faq_open", question_id: "valores" }));
  });

  test("Instagram aponta para o perfil oficial", async ({ page }) => {
    await gotoHome(page);
    const links = page.locator(`a[href="${INSTAGRAM_URL}"]`);
    expect(await links.count()).toBeGreaterThanOrEqual(1);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("data-track", "instagram_click");
    }
  });
});

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
