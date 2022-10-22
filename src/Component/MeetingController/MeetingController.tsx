import { motion } from 'framer-motion';

import { CHARACTER_LEVEL } from './MeetingController.const';
import { MeetingControllerProps } from './MeetingController.type';

import { useToggle } from '@/Hook';

const iconOnStyle =
  'flex justify-center items-center w-[36px] h-[36px] rounded-lg bg-primary-point-black';
const iconOffStyle = 'w-[36px] h-[36px] flex justify-center items-center';
const iconStyle = 'w-[20px] h-[20px] cursor-pointer';

// type MeetingProps = MeetingControllerProps & { toggleState: () => void };

const getUrlByMeetingState = (flag: boolean) => (flag ? 'mettingOn' : 'mettingOff');

const MeetingToggle = () => {
  const { state: meetingState, toggleState } = useToggle();

  const MeetingToggleButton = () => (
    <div
      className={`w-[70px] h-[40px] rounded-[30px] border border-primary-lightOrange flex items-center cursor-pointer bg-primary-${
        meetingState ? 'orange' : 'lightOrange'
      } mettingToggleButton`}
      onClick={toggleState}
      aria-hidden
      title='회의 나가기'
    >
      <motion.img
        animate={{ x: meetingState ? 33 : 5 }}
        src={`/asset/${getUrlByMeetingState(meetingState)}.svg`}
        alt='meetingImg'
        className='w-[30px] h-[30px]'
      />
    </div>
  );

  return {
    state: meetingState,
    component: MeetingToggleButton,
  };
};

const MuteButton = () => {
  const { state: micState, toggleState: handleMicToggle } = useToggle();

  return (
    <div className='flex items-center muteButton'>
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
    </div>
  );
};

const ShareDisplayButton = () => {
  const { state: windowState, toggleState: handleWindowToggle } = useToggle();

  return (
    <div className='flex justify-between shareButton'>
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
  );
};

export const MeetingController = ({ userId, userLevel }: MeetingControllerProps) => {
  const src = CHARACTER_LEVEL[userLevel];
  const { component: MeetingToggleButton, state: meetingState } = MeetingToggle();

  return (
    <div className='p-[10px] box-border mt-[10px] border-t-2'>
      <div className={`border-t-grey-background  ${meetingState ? 'meetingOn' : 'meetingOff'}`}>
        <div className='flex items-center title'>
          <img
            src={src}
            alt='character'
            className='w-[30px] h-[30px] rounded-lg mr-2'
          />
          <span className='text-xl'>{userId}</span>
        </div>
        {meetingState && <MuteButton />}
        {meetingState && <ShareDisplayButton />}
        <MeetingToggleButton />
      </div>
    </div>
  );
};
