import { CHARACTER_LEVEL } from './MeetingController.const';
import { MeetingControllerProps } from './MeetingController.type';

import { useToggle } from '@/Hook';

const iconOnStyle =
  'flex justify-center items-center w-[36px] h-[36px] rounded-lg bg-primary-point-black';
const iconOffStyle = 'w-[36px] h-[36px] flex justify-center items-center';
const iconStyle = 'w-[20px] h-[20px] cursor-pointer';

type MeetingProps = MeetingControllerProps & { toggleState: () => void };
const MeetingOn = ({ userId, userLevel, toggleState }: MeetingProps) => {
  const src = CHARACTER_LEVEL[userLevel];
  const { state: micState, toggleState: handleMicToggle } = useToggle();
  const { state: windowState, toggleState: handleWindowToggle } = useToggle();
  return (
    <div className='p-[16px] box-border w-[calc(100%-32px)] border border-primary-lightOrange rounded-xl bg-primary-lightOrange m-4'>
      <div className='flex items-center'>
        <img
          src={src}
          alt='character'
          className='w-[25px] h-[25px] rounded-lg mr-2'
        />
        <span className='text-xl'>{userId}</span>
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center '>
          <div
            className={`mr-4 ${micState ? ` ${iconOffStyle}` : `${iconOnStyle}`}`}
            onClick={handleMicToggle}
            aria-hidden
            title={micState ? '음소거 해제' : '음소거'}
          >
            <img
              src={micState ? '/asset/micOn.svg' : '/asset/micOff.svg'}
              alt='mic'
              className={iconStyle}
            />
          </div>
          <div className={windowState ? iconOnStyle : iconOffStyle}>
            <img
              src={windowState ? '/asset/windowOff.svg' : '/asset/windowOn.svg'}
              alt='mic'
              className={iconStyle}
              title={windowState ? '화면공유 중단' : '화면공유'}
              onClick={handleWindowToggle}
              aria-hidden
            />
          </div>
        </div>
        <div
          className='w-[70px] h-[35px] rounded-2xl border border-primary-lightOrange flex items-center cursor-pointer bg-primary-orange justify-end'
          onClick={toggleState}
          aria-hidden
          title='회의 나가기'
        >
          <img
            src='/asset/mettingOn.svg'
            alt='mettingOff'
            className='w-[30px] h-[30px]'
          />
        </div>
      </div>
    </div>
  );
};

const MeetingOff = ({ userId, userLevel, toggleState }: MeetingProps) => {
  const src = CHARACTER_LEVEL[userLevel];
  return (
    <div className='flex justify-between p-[16px] box-border items-center w-[100%]'>
      <div className='flex items-center'>
        <img
          src={src}
          alt='character'
          className='w-[30px] h-[30px] rounded-lg mr-2'
        />
        <span className='text-xl'>{userId}</span>
      </div>
      <div
        className='w-[70px] h-[35px] rounded-2xl border border-primary-lightOrange flex items-center cursor-pointer bg-primary-lightOrange '
        onClick={toggleState}
        aria-hidden
        title='회의 참여하기'
      >
        <img
          src='/asset/mettingOff.svg'
          alt='mettingOff'
          className='w-[30px] h-[30px]'
        />
      </div>
    </div>
  );
};
export const MeetingController = (props: MeetingControllerProps) => {
  const { state: meetingState, toggleState } = useToggle();
  return (
    <div className='border-t-grey-background border-t-2'>
      {meetingState ? (
        <MeetingOn
          {...props}
          toggleState={toggleState}
        />
      ) : (
        <MeetingOff
          {...props}
          toggleState={toggleState}
        />
      )}
    </div>
  );
};
