import { BasicTeamInfoProps } from './BasicTeamInfo.type';
import { getChannelIconSrc } from './BasicTeamInfo.util';

const imgSize = 'w-4 h-4';
const ChannelBasicClassName =
  'flex items-center space-x-2 p-[10px] h-8 box-border mb-2 cursor-pointer';
const Channel = ({ name, select, dataId }: { name: string; select: boolean; dataId: number }) => {
  const src = getChannelIconSrc({ name, select });
  return (
    <div
      id='ChannelItem'
      data-id={dataId}
      className={`${ChannelBasicClassName} ${select ? 'bg-select-rgba rounded-lg' : ''}`}
    >
      <img
        src={src}
        alt='Channel Icon'
        className={imgSize}
      />
      <p className={select ? 'text-main-color' : 'text-[#888888]'}>{name}</p>
    </div>
  );
};
export const BasicTeamInfo = ({
  ChannelList,
  channelSelect,
  handleChangeChannelSelect,
}: BasicTeamInfoProps) => (
  <div
    className='mt-6'
    onClick={handleChangeChannelSelect}
    aria-hidden
  >
    <Channel
      name='General'
      dataId={-1}
      select={channelSelect === -1}
    />
    {ChannelList.map(({ name, channelId }) => (
      <Channel
        name={name}
        key={channelId}
        dataId={channelId}
        select={channelSelect === channelId}
      />
    ))}
  </div>
);
