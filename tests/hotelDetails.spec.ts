import { test } from './setup';
import { getDateString } from '../utils/dateUtils';
import { searchHotel } from '../actions/landingPageActions';
import { validateHotelDetailsFields } from '../actions/hotelDetailsPageActions';

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