import { getChannelIconSrc } from './Channel.util';

const imgSize = 'w-4 h-4';
const ChannelBasicClassName =
  'flex items-center space-x-2 p-[10px] h-8 box-border mb-2 cursor-pointer';

export const Channel = ({
  name,
  select,
  dataId,
}: {
  name: string;
  select: boolean;
  dataId: number;
}) => {
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
