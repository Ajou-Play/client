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

  const { component: MeetingToggleButton, state: meetingState } = useMeetingController();
  const { users, camState, handleCamToggle, addUser } = useCamController(
    streamRef,
    videoRef,
    chatRoomId,
  );
  const { micState, handleMicToggle } = useMicController(streamRef);
  const { windowState, handleWindowToggle } = useWindowController({
    streamRef: windowShareRef,
    videoRef: windowShareVideoRef,
    chatRoomId,
    addUser,
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
