import type { GetCalendarData } from './ChannelHome.type';
import { SIDE_BAR_WIDTH, ITEM_WIDTH } from './SmallArchiveList/ChannelHome.const';

export const debounce = (func: Function, ms: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      func();
    }, ms);
  };
};

export const getItewmsLengthByWindowSize = () =>
  Math.floor((window.innerWidth - SIDE_BAR_WIDTH) / ITEM_WIDTH);

const splitStringDate = (stringDate: string) => {
  const splitDate = stringDate.split('-');
  return splitDate.reduce((acc, cur, i) => {
    if (i === 0) {
      return {
        year: cur,
      };
    }
    if (i === 1) {
      return {
        ...acc,
        month: cur,
      };
    }
    return {
      ...acc,
      day: cur,
    };
  }, {});
};
export const getCalendarData = ({ archiveItems }: GetCalendarData) =>
  archiveItems.map(({ createdAt }) => createdAt.toString().split('T')[0]).map(splitStringDate);
