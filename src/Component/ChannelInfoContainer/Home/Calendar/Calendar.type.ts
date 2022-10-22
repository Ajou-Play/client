type CalendarType = 'year' | 'month' | 'day';
export type CalendarDate = Record<CalendarType, string>;
export type CalendarProps = {
  createdDates: CalendarDate[];
};

export type CountArchiveInDay = {
  createdDates: CalendarDate[];
};

type ArchiveCountSetValue = CalendarDate & {
  count: number;
};
export type ArchiveCountSet = {
  [key: string]: ArchiveCountSetValue;
};

export type DayData = Record<CalendarType, number> & { prev: boolean };
export type WeekData = DayData[];
