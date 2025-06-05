import { Page, expect } from '@playwright/test';

export async function filterByPropertyName(page: Page, propertyName: string) {
    await page.locator(".p-inputtext.p-component.inputtext-box").fill(propertyName);
}

export async function clearFilters(page: Page) {
    await page.locator(".clear-filters").click();
}