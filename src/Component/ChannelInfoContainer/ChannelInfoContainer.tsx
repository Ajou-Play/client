import { ChannelInfoContainerType } from './ChannelInfoContainer.type';
import { getChannelIconSrc } from './ChannelInfoContainer.util';

export const ChannelInfoContainer = ({ children, channelId, name }: ChannelInfoContainerType) => {
  const src = getChannelIconSrc({ channelId });
  return (
    <div className='w-[calc(100vw-362px)]'>
      <div className='flex w-[100%] h-[80px] items-center pl-[20px] space-x-4 leading-5.5 font-extrabold'>
        <img
          src={src}
          alt='Channel Icon'
          className='w-[20px] h-[20px]'
        />
        <p>{name}</p>
      </div>
      <div className='bg-[#C5C5C5] w-[100%] h-[100%]'>{children}</div>
    </div>
  );
};
