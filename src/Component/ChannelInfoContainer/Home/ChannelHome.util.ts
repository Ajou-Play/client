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
