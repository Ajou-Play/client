import { createContext, ReactNode, useRef } from 'react';

import {
  useCamController,
  useMeetingController,
  useMicController,
  useWindowController,
} from './WebRTC.hook';
import type { WebRTCState } from './WebRTC.type';

export const WebRTCContext = createContext<WebRTCState>({} as WebRTCState);

export const WebRTCProvider = ({
  children,
  chatRoomId,
}: {
  children: ReactNode;
  chatRoomId: number;
}) => {
  const streamRef = useRef<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { users, camState, handleCamToggle } = useCamController(streamRef, videoRef, chatRoomId);
  const { component: MeetingToggleButton, state: meetingState } = useMeetingController();
  const { micState, handleMicToggle } = useMicController(streamRef);
  const { windowState, handleWindowToggle } = useWindowController(streamRef);

  const value = {
    users,
    videoRef,
    MeetingToggleButton,
    meetingState,
    micState,
    windowState,
    handleMicToggle,
    handleWindowToggle,
    camState,
    handleCamToggle,
  } as WebRTCState;

  return <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>;
};
