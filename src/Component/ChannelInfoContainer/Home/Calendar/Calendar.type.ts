type CalendarType = 'year' | 'month' | 'day';
export type CalendarDate = Record<CalendarType, string>;
export type CalendarProps = {
  createdDates: CalendarDate[];
};
