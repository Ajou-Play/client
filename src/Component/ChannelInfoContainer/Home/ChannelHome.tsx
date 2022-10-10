import { ArchiveList } from '../Archive';
import { ChannelHomeProps } from './ChannelHome.type';

export const ChannelHome = ({ archiveItems }: ChannelHomeProps) => {
  console.log('1');
  return (
    <>
      <div className='text-[#403F40] font-extrabold'>최근문서</div>
      <ArchiveList archiveItems={archiveItems} />
    </>
  );
};
