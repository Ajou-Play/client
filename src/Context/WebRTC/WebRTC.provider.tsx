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
  const windowShareRef = useRef<MediaStream>();
  const windowShareVideoRef = useRef<HTMLVideoElement>(null);

  const { users, camState, handleCamToggle, addUser, handleCamFalse } = useCamController(
    streamRef,
    videoRef,
    chatRoomId,
  );
  const { micState, handleMicToggle, handleMicFalse } = useMicController(streamRef);
  const { windowState, handleWindowToggle, handleWindowFalse } = useWindowController({
    streamRef: windowShareRef,
    videoRef: windowShareVideoRef,
    chatRoomId,
    addUser,
  });
  const { component: MeetingToggleButton, state: meetingState } = useMeetingController(() => {
    handleCamFalse();
    handleMicFalse();
    handleWindowFalse();
  });

  const value = {
    users,
    videoRef,
    windowShareVideoRef,
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
