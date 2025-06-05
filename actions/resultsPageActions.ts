import { Page, expect } from '@playwright/test';

export async function filterByPropertyName(page: Page, propertyName: string) {
    await page.locator(".p-inputtext.p-component.inputtext-box").fill(propertyName);
}

export async function clearFilters(page: Page) {
    await page.locator(".clear-filters").click();
}

export async function selectFirstHotel(page: Page): Promise<Page> {

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('.v-hotelList__cards__hotel').nth(0).locator('.availability-text').click()
    ]);

    return newPage;

}

export async function selectHotelByName(page: Page, name: string): Promise<Page> {
    const hotelCard = page.locator(".p-hotelCard.radius_lg", { hasText: name })

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        await hotelCard.locator('.availability-text').click()
    ]);

    return newPage;

}