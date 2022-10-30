import { ArchiveListProps } from '../Archive/ChannelArchive.type';
import { CalendarDate } from './Calendar/Calendar.type';

export type ChannelHomeProps = ArchiveListProps;
export type UseGetHomeArchiveList = ChannelHomeProps;
export type GetCalendarData = ({ archiveItems }: ChannelHomeProps) => CalendarDate[];

export type objectType = {
  [key: number]: string;
};
