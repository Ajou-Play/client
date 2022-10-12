import { SmallArchiveList } from '../Archive/SmallArchiveList/SmallArchiveList';
import { useGetHomeArchiveList } from './ChannelHome.hook';
import { ChannelHomeProps } from './ChannelHome.type';

export const ChannelHome = ({ archiveItems }: ChannelHomeProps) => {
  const items = useGetHomeArchiveList({ archiveItems });

  return (
    <div className='w-[calc(100%)] h-[320px] rounded-3xl bg-grey-offWhite p-8 box-border'>
      <div className='text-[#403F40] font-extrabold'>최근문서</div>
      <SmallArchiveList archiveItems={items} />
    </div>
  );
};
