import { useState, useEffect } from 'react';

import { ChannelHomeProps } from './ChannelHome.type';
import { debounce, getItewmsLengthByWindowSize } from './ChannelHome.util';
import { DEBOUNCE_TIME } from './SmallArchiveList/ChannelHome.const';

import { getItemsOfList } from '@Util/.';

type UseGetHomeArchiveList = ChannelHomeProps;
export const useGetHomeArchiveList = ({ archiveItems }: UseGetHomeArchiveList) => {
  const [items, setItems] = useState(getItemsOfList(archiveItems, getItewmsLengthByWindowSize()));

  useEffect(() => {
    window.onresize = debounce(() => {
      const prevLength = items.length;
      const nextLength = getItewmsLengthByWindowSize();
      if (prevLength === nextLength) return;
      setItems(getItemsOfList(archiveItems, nextLength));
    }, DEBOUNCE_TIME);
    return () => {
      window.onresize = null;
    };
  }, [archiveItems, items]);

  useEffect(() => {
    setItems(getItemsOfList(archiveItems, getItewmsLengthByWindowSize()));
  }, [archiveItems]);

  return items;
};
