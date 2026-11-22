import { defineConfig, devices } from "@playwright/test";

/**
 * E2E dos fluxos de conversão da Morbius Kennel.
 *
 * Roda contra um servidor JÁ em execução (não sobe `next start` e não usa `webServer`).
 * Padrão: servidor de produção local (npm run start) em http://localhost:3000.
 *   npx playwright test --reporter=list
 *   $env:E2E_BASE_URL="http://localhost:3000"; npx playwright test --reporter=list   (PowerShell)
 *
 * `reducedMotion: "reduce"` torna o teste determinístico: desliga o scroll suave e as
 * animações de entrada (.mk-hero-in / .mk-reveal / lightbox), que o próprio CSS respeita.
 */
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

/** Specs exclusivas do viewport mobile (menu hambúrguer, barra fixa inferior). */
const MOBILE_ONLY = /mobile\.spec\.ts$/;
/** Specs de conversão/interação que também rodam no mobile. */
const MOBILE_SHARED = /(home|selector)\.spec\.ts$/;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Servidor compartilhado: carga leve.
  workers: 2,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    reducedMotion: "reduce",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      testIgnore: MOBILE_ONLY,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile-chromium",
      testMatch: [MOBILE_ONLY, MOBILE_SHARED],
      use: {
        ...devices["Pixel 5"],
        viewport: { width: 390, height: 844 },
        screen: { width: 390, height: 844 },
      },
    },
  ],
});
