import { test } from './setup';
import { getDateString } from '../utils/dateUtils';
import { searchHotel } from '../actions/landingPageActions';
import { validateHotelDetailsFields, validateHotelName } from '../actions/hotelDetailsPageActions';
import { filterByPropertyName, selectHotelByName } from '../actions/resultsPageActions';
import { expect } from '@playwright/test';

test('validate hotel details  fields', async ({ page }) => {
    await test.step('Precondition: Search for hotels', async () => {
        const fromDate = new Date();
        const toDate = getDateString(5);
        searchHotel(page, 'Barcelona', fromDate, toDate, 1, 3);
    });

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('.v-hotelList__cards__hotel').nth(0).locator('.availability-text').click()
    ]);

    await validateHotelDetailsFields(newPage);
});

test('open details page for specific hotel', async ({ page }) => {
    await test.step('Precondition: Search for hotels', async () => {
        const fromDate = new Date();
        const toDate = getDateString(5);
        searchHotel(page, 'Barcelona', fromDate, toDate, 1, 3);
    });
    const hotelName = "Hilton Diagonal Mar Barcelona";

    await filterByPropertyName(page, 'Hilton');
    await expect(page.locator('.p-button.p-component.p-button-outlined.hotel-filter')).toContainText('Hilton');

    const newPage = await selectHotelByName(page, hotelName);
    await validateHotelName(newPage, hotelName);
});