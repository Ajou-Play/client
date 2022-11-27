import { ChannelArchive } from '../Archive';
import { ChannelHome } from '../Home';
import { MainViewProps } from './MainView.type';

import { useGetArchiveItems } from '@Page/MainPage/MainPage.hook';

export const MainView = ({ body }: MainViewProps) => {
  const archiveItems = useGetArchiveItems();
  return (
    <div className='w-[100%] h-[100%] overflow-auto'>
      {body === 'HOME' ? (
        <ChannelHome archiveItems={archiveItems} />
      ) : (
        <ChannelArchive archiveItems={archiveItems} />
      )}
    </div>
  );
};
