import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto('https://v3.nuitee.link/');
        await page.waitForLoadState('domcontentloaded');

        const acceptCookies = page.locator('.accept-button');

        if (await acceptCookies.isVisible()) {
            await acceptCookies.click();
        }

        await use(page);
    },
});
