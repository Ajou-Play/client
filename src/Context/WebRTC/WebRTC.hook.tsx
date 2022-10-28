import { motion } from 'framer-motion';
import { useContext, useEffect, useMemo } from 'react';

import { WebRTCContext } from './WebRTC.provider';
import { muteCam, muteMic, muteWindow } from './WebRTC.util';

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

export const useMicController = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  const { state: micState, toggleState: handleMicToggle } = useToggle();
  useEffect(() => {
    muteMic(ref);
  }, [micState]);
  return { micState, handleMicToggle };
};

export const useCamController = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  const { state: camState, toggleState: handleCamToggle } = useToggle();
  useEffect(() => {
    muteCam(ref);
  }, [camState]);
  return { camState, handleCamToggle };
};

export const useWindowController = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  const { state: windowState, toggleState: handleWindowToggle } = useToggle();
  useEffect(() => {
    muteWindow(ref);
  }, [windowState]);
  return { windowState, handleWindowToggle };
};

export const useCamState = () => {
  const { camState, handleCamToggle } = useContext(WebRTCContext);
  return useMemo(() => ({ camState, handleCamToggle }), [camState, handleCamToggle]);
};

export const useMicState = () => {
  const { micState, handleMicToggle } = useContext(WebRTCContext);
  return useMemo(() => ({ micState, handleMicToggle }), [micState, handleMicToggle]);
};

export const useWindowState = () => {
  const { windowState, handleWindowToggle } = useContext(WebRTCContext);
  return useMemo(() => ({ windowState, handleWindowToggle }), [windowState, handleWindowToggle]);
};

export const useCamChatState = () => {
  const { users, videoRef } = useContext(WebRTCContext);
  return { users, videoRef };
};

export const useMeetingToggleState = () => {
  const { MeetingToggleButton, meetingState } = useContext(WebRTCContext);
  return { MeetingToggleButton, meetingState };
};
