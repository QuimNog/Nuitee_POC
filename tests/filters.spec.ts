import { expect } from '@playwright/test';
import { test } from './setup';
import { getDateString } from '../utils/dateUtils';
import { searchHotel } from '../actions/landingPageActions';
import { filterByPropertyName, clearFilters } from '../actions/resultsPageActions';

test('filter by property name and clear filters', async ({ page }) => {
    await test.step('Precondition: Search for hotels', async () => {
        const fromDate = new Date();
        const toDate = getDateString(5);

        searchHotel(page, 'Barcelona', fromDate, toDate, 1, 3);
    });
    await expect(page.locator('.filters-content--visible')).toBeVisible();

    await filterByPropertyName(page, 'Hilton');
    await expect(page.locator('.p-button.p-component.p-button-outlined.hotel-filter')).toContainText('Hilton');

    await clearFilters(page);
    await expect(page.locator('.p-button.p-component.p-button-outlined.hotel-filter')).toBeHidden();

});

test('filter by non-existing property name', async ({ page }) => {
    await test.step('Precondition: Search for hotels', async () => {
        const fromDate = new Date();
        const toDate = getDateString(5);
        searchHotel(page, 'Barcelona', fromDate, toDate, 1, 3);
    });
    await expect(page.locator('.filters-content--visible')).toBeVisible();

    await filterByPropertyName(page, 'NonExisting');
    await expect(page.locator('.p-button.p-component.p-button-outlined.hotel-filter')).toContainText('NonExisting');
    await expect(page.locator('.searchResult')).toContainText('0 properties matching this name');
});
