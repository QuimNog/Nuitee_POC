import { expect } from '@playwright/test';
import { test } from './setup';;
import { getDateString } from '../utils/dateUtils';
import { fillCity, fillDates, fillGuests } from '../actions/landingPageActions';

test('search hotels for Barcelona, 5 days and 3 guests', async ({ page }) => {
  const fromDate = new Date();
  const toDate = getDateString(5);

  await fillCity(page, 'Barcelona');
  await fillDates(page, fromDate, toDate);
  await fillGuests(page, 1, 3);

  await expect(page.locator('.p-search--placeholder_search--location')).toContainText('Barcelona');
  await expect(page.locator('.p-search--placeholder_search--guests')).toContainText('3 Guests');
  await expect(page.locator('.filters-content--visible')).toBeVisible();
});

test('search invalid city', async ({ page }) => {
  await page.locator("#place-autocomplete input[type='text']").fill("GSGASHAHSAHS");
  await expect(page.locator('.no-results')).toBeVisible();
});
