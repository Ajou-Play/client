import { ChannelInfoContainerType } from './ChannelInfoContainer.type';
import { getChannelIconSrc } from './ChannelInfoContainer.util';

export const ChannelInfoContainer = ({
  children,
  channelId,
  name,
  handleClick,
}: ChannelInfoContainerType) => {
  const src = getChannelIconSrc({ channelId });

  return (
    <div className='w-[100%] h-[100%]'>
      <div className='flex w-[100%] h-[80px] items-center justify-between'>
        <div className='flex pl-[20px] space-x-4 leading-5.5 font-bold'>
          <img
            src={src}
            alt='Channel Icon'
            className='w-[20px] h-[20px]'
          />
          <p>{name}</p>
        </div>
        <div className='flex pr-[20px] space-x-4 leading-5.5 font-bold'>
          <button
            type='button'
            onClick={() => handleClick('Message')}
          >
            <img
              src='/asset/Message.svg'
              className='w-[20px] h-[20px]'
              alt='Message'
            />
          </button>
          <button
            type='button'
            onClick={() => handleClick('Member')}
          >
            <img
              src='/asset/Member.svg'
              className='w-[20px] h-[20px]'
              alt='Member'
            />
          </button>
        </div>
      </div>
      <div className='bg-[#F1F1F1] w-[100%] h-[100%] px-[48px] py-[50px] box-border'>
        {children}
      </div>
    </div>
  );
};
