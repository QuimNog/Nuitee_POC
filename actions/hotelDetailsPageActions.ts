import { Page, expect } from '@playwright/test';

export async function validateHotelDetailsFields(page: Page) {
    await expect(page.locator('#hotel-overview')).toBeVisible();
    await expect(page.locator('.title-section--content--title')).toBeVisible();
    await expect(page.locator('.title-section--buttons--rooms')).toBeVisible();
    await expect(page.locator('.popular-facilities')).toBeVisible();
    await expect(page.locator('.reviews')).toBeVisible();
}

export async function chooseFirstRoom(page: Page) {
    await page.locator('.room-overlay.radius_md').locator('[aria-label="Choose room"]').nth(0).click();
}