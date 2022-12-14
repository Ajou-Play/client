import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ChannelInfoContainerType } from './ChannelInfoContainer.type';
import { getChannelIconSrc } from './ChannelInfoContainer.util';

export const ChannelInfoContainer = ({
  children,
  channelId,
  name,
  handleClickWindow,
}: ChannelInfoContainerType) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const src = getChannelIconSrc({ channelId });

  const handleNavigate = (type: 'HOME' | 'ARCHIVE') =>
    navigate(type === 'HOME' ? 'ARCHIVE' : 'HOME');

  return (
    <div className='max-w-[calc(100vw-362px)] min-w-[calc(100vw-662px)] h-[100%]'>
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
            onClick={() => handleNavigate(pathname.replace('/', '') as 'HOME' | 'ARCHIVE')}
            className='bg-primary-lightOrange flex w-[110px] h-[37px] box-border p-[10px] justify-around items-center rounded-lg'
          >
            <img
              src='/asset/ArchiveIcon.svg'
              className='w-[16px] h-[16px]'
              alt='Archive'
            />
            <span className='text-primary-orange text-base'>아카이브</span>
          </button>
          <button
            type='button'
            onClick={() => handleClickWindow('Message')}
          >
            <img
              src='/asset/Message.svg'
              className='w-[20px] h-[20px]'
              alt='Message'
            />
          </button>
          <button
            type='button'
            onClick={() => handleClickWindow('Member')}
          >
            <img
              src='/asset/Member.svg'
              className='w-[20px] h-[20px]'
              alt='Member'
            />
          </button>
        </div>
      </div>
      {/* overflow 되어야함 */}
      <div className='bg-[#F1F1F1] w-[100%] h-[calc(100vh-80px)] px-[48px] py-[36px] box-border flex'>
        {children}
      </div>
    </div>
  );
};
