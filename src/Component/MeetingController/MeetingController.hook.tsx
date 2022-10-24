import { motion } from 'framer-motion';

import { useToggle } from '@Hook/.';

const getUrlByMeetingState = (flag: boolean) => (flag ? 'mettingOn' : 'mettingOff');
export const useMeetingController = () => {
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
