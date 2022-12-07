import { BasicTeamInfoProps } from './BasicTeamInfo.type';

import { getChannelIconSrc } from '@Component/Channel/Channel.util';
import { useAddChannelModal } from '@Component/Modal';

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
  handleAddChannel,
  handleChangeChannelSelect,
}: BasicTeamInfoProps) => {
  const { handleOpen, Component: AddChannelModal } = useAddChannelModal({ handleAddChannel });

  return (
    <div
      className='mt-6 w-[100%] px-4'
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
      <button
        type='button'
        className={ChannelBasicClassName}
        onClick={handleOpen}
      >
        <img
          src='/asset/Add.svg'
          alt='Channel Icon'
          className={imgSize}
        />
        <p className='text-[#888888]'>채널 추가하기</p>
      </button>
      <AddChannelModal />
    </div>
  );
};
