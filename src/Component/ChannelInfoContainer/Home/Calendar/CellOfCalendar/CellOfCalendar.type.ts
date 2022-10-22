import type { DayData, ArchiveCountSet } from '../Calendar.type';

export type CellOfCalendarProps = DayData & {
  countArchiveSet: ArchiveCountSet;
};
