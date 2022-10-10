import { ArchiveList } from '../Archive';
import { ChannelHomeProps } from './ChannelHome.type';

export const ChannelHome = ({ archiveItems }: ChannelHomeProps) => {
  console.log('1');
  return (
    <div>
      <div>top</div>
      <div>최근문서</div>
      <ArchiveList archiveItems={archiveItems} />
    </div>
  );
};
