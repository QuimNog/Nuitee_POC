import { addDays, format } from 'date-fns';

export function getDateString(offsetDays: number): Date {
    const targetDate = addDays(new Date(), offsetDays);
    return targetDate;
}
