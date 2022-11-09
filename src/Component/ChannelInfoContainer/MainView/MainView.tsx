import { ChannelArchive } from '../Archive';
import { ChannelHome } from '../Home';
import { MainViewProps } from './MainView.type';

export const MainView = ({ archiveItems, body }: MainViewProps) => (
  <div className='w-[100%] h-[100%] overflow-auto'>
    {body === 'Home' ? (
      <ChannelHome archiveItems={archiveItems} />
    ) : (
      <ChannelArchive archiveItems={archiveItems} />
    )}
  </div>
);
