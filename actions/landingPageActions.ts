import { Page, expect } from '@playwright/test';
import { format } from 'date-fns';

export async function fillCity(page: Page, city: string) {
    await page.locator("#place-autocomplete input[type='text']").fill(city);
    const firstSuggestion = page.locator("#place-autocomplete_0");

    await expect(firstSuggestion).toContainText(city);
    await firstSuggestion.click();
}

export async function fillDates(page: Page, from: Date, to: Date) {

    const today = format(new Date(), 'yyyy-MM-dd');
    const fromDate = format(from, 'yyyy-MM-dd');
    const toDate = format(to, 'yyyy-MM-dd');

    if (fromDate < today) {
        throw new Error(`"From" date (${fromDate}) must be after today's date (${today})`);
    }

    await page.locator(".date-description").click();
    await expect(page.locator(".vc-pane-container")).toBeVisible();


    await page.locator(`.vc-day.id-${fromDate} .vc-day-content`).click();
    await page.locator(`.vc-day.id-${toDate} .vc-day-content`).click();
}

export async function fillGuests(page: Page, rooms: number, guests: number) {
    await page.getByLabel('Customise options').click();

    await expect(page.locator(".select-guests-header")).toContainText('Configuring Rooms');

    var currentRooms = await page.locator('.p-select-guest-room').count();
    var currentGuests = await getTotalGuests(page);

    while (currentGuests != guests) {
        if (currentGuests < guests) {
            await page.locator('button.p-button-icon-only.btn-minus[data-pc-name="button"][data-pc-severity="secondary"]').nth(0).click();
        }
        else {
            await page.locator('button.p-button-icon-only.btn-plus[data-pc-name="button"][data-pc-severity="secondary"]').nth(0).click();
        }
        currentGuests = await getTotalGuests(page);
    }

    await page.locator('[aria-label="Apply"]').click();

}

export async function searchHotel(page: Page, city: string, from: Date, to: Date, rooms: number, guests: number) {
    await fillCity(page, city);
    await fillDates(page, from, to);
    await fillGuests(page, rooms, guests);
}

async function getTotalGuests(page: Page): Promise<number> {
    const rooms = await page.locator('.p-select-guest-room');
    const roomCount = await rooms.count();
    let totalGuests = 0;

    for (let i = 0; i < roomCount; i++) {
        const room = rooms.nth(i);

        const adults = await room.locator('.p-selectNumber .number').nth(0).innerText();
        const children = await room.locator('.p-selectNumber .number').nth(1).innerText();

        totalGuests += parseInt(adults, 10) + parseInt(children, 10);
    }

    return totalGuests;
}