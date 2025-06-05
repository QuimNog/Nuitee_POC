import { Page, expect } from '@playwright/test';

export async function validateCheckoutFields(page: Page) {
    await expect(page.getByText('Payment Information')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.p-booking__detailedReview__checkin-checkout')).toBeVisible();
    await expect(page.locator('.p-booking__detailedReview__roomDetails')).toBeVisible();
}

export async function fillPersonalInformation(page: Page, name: string, surname: string, email: string) {
    await page.locator("#firstName").nth(0).fill(name);
    await page.locator("#lastName").nth(0).fill(surname);
}