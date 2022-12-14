import { Calendar } from './Calendar';
import { useGetHomeArchiveList } from './ChannelHome.hook';
import type { ChannelHomeProps } from './ChannelHome.type';
import { getCalendarData } from './ChannelHome.util';
import { CharacterInfo } from './CharacterInfo';
import { SmallArchiveList } from './SmallArchiveList';

const BOX_STYLE = 'rounded-3xl bg-grey-offWhite p-8 box-border';

export const ChannelHome = ({ archiveItems }: ChannelHomeProps) => {
  const items = useGetHomeArchiveList({ archiveItems });
  const createdDates = getCalendarData({ archiveItems });

  return (
    <div className='w-[100%] h-[100%] flex flex-col'>
      <div className='w-[100%] h-[60%] flex justify-between mb-8 min-h-[400px]'>
        <div className='w-[100%] h-[100%]'>
          <CharacterInfo />
        </div>
        <div className={` h-[100%] ${BOX_STYLE} min-w-[500px]`}>
          <Calendar createdDates={createdDates} />
        </div>
      </div>
      <div className={`w-[100%] h-[35%] ${BOX_STYLE}`}>
        <div className='text-[#403F40] font-extrabold'>최근문서</div>
        <SmallArchiveList archiveItems={items} />
      </div>
    </div>
  );
};
