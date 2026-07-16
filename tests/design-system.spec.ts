import { test, expect } from "@playwright/test";

/**
 * Single screenshot-diff test on /design-system.
 * Catches ~80% of accidental primitive breakage (per BUILD-PLAN §7.4, §10).
 *
 * M0: reserves the test slot. Every M3+ primitive that lands on /design-system
 * gets covered by this one snapshot automatically.
 */
test("design-system route renders and matches snapshot", async ({ page }) => {
  await page.goto("/design-system");
  await expect(page).toHaveTitle(/Design System/);
  await expect(page).toHaveScreenshot("design-system.png", {
    maxDiffPixelRatio: 0.01,
    fullPage: true,
  });
});
