import { useContext } from 'react';

import { WebRTCContext } from './WebRTC.provider';

export const useWebRTCState = () => {
  const webRTCState = useContext(WebRTCContext);
  return webRTCState;
};

export const useMicState = () => {
  const { micState, handleMicToggle } = useContext(WebRTCContext);
  return { micState, handleMicToggle };
};

export const useWindowState = () => {
  const { windowState, handleWindowToggle } = useContext(WebRTCContext);
  return { windowState, handleWindowToggle };
};

export const useMeetingToggleState = () => {
  const { MeetingToggleButton, meetingState } = useContext(WebRTCContext);
  return { MeetingToggleButton, meetingState };
};
