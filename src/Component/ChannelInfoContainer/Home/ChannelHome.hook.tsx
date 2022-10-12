import { useState, useEffect } from 'react';

import { ChannelHomeProps } from './ChannelHome.type';
import { debounce } from './ChannelHome.util';

import { getItemsOfList } from '@Util/.';

const SIDE_BAR_WIDTH = 458;
const ITEM_WIDTH = 150;
const DEBOUNCE_TIME = 500;

type UseGetHomeArchiveList = ChannelHomeProps;
export const useGetHomeArchiveList = ({ archiveItems }: UseGetHomeArchiveList) => {
  const [items, setItems] = useState(
    getItemsOfList(archiveItems, Math.floor((window.innerWidth - SIDE_BAR_WIDTH) / ITEM_WIDTH)),
  );

  useEffect(() => {
    window.onresize = debounce(() => {
      setItems(
        getItemsOfList(archiveItems, Math.floor((window.innerWidth - SIDE_BAR_WIDTH) / ITEM_WIDTH)),
      );
    }, DEBOUNCE_TIME);
    return () => {
      window.onresize = null;
    };
  }, [archiveItems]);

  useEffect(() => {
    setItems(
      getItemsOfList(archiveItems, Math.floor((window.innerWidth - SIDE_BAR_WIDTH) / ITEM_WIDTH)),
    );
  }, [archiveItems]);

  return items;
};
