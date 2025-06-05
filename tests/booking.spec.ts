import { expect } from '@playwright/test';
import { test } from './setup';
import { getDateString } from '../utils/dateUtils';
import { searchHotel } from '../actions/landingPageActions';
import { validateHotelName, chooseFirstRoom } from '../actions/hotelDetailsPageActions';
import { fillPersonalInformation, validateCheckoutFields } from '../actions/chcekoutPageActions';
import { filterByPropertyName, selectHotelByName, selectFirstHotel } from '../actions/resultsPageActions';

test('cant confirm a booking without mandatory fields', async ({ page }) => {
    await test.step('Precondition: Search for hotels', async () => {
        const fromDate = new Date();
        const toDate = getDateString(5);
        searchHotel(page, 'Barcelona', fromDate, toDate, 1, 3);
    });

    const newPage = await selectFirstHotel(page);

    await chooseFirstRoom(newPage);

    await validateCheckoutFields(newPage);
    await fillPersonalInformation(newPage, 'Test', 'Nuitee', 'testNuitee@gmail.com')
    await newPage.locator('[aria-label="Complete Booking"]').click();

    await expect(newPage.getByText("Please fill in all the required fields.")).toBeVisible();

});