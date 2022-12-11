import { useOutletContext } from 'react-router-dom';

import { ChannelArchive } from '../Archive';
import { ChannelHome } from '../Home';
import { MainViewProps } from './MainView.type';

import { useGetArchiveItems } from '@Page/MainPage/MainPage.hook';

type MainViewType = {
  channelId: number;
};

export const MainView = ({ body }: MainViewProps) => {
  const { channelId } = useOutletContext<MainViewType>();
  const archiveItems = useGetArchiveItems(channelId);
  return (
    <div className='w-[calc(100vw-362px)] h-[100%] overflow-auto'>
      {body === 'HOME' ? (
        <ChannelHome archiveItems={archiveItems} />
      ) : (
        <ChannelArchive archiveItems={archiveItems} />
      )}
    </div>
  );
};
