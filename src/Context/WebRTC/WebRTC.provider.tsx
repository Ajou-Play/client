import { createContext, ReactNode } from 'react';

import { WebRTCState } from './WebRTC.type';

import { useMeetingController } from '@Component/MeetingController';
import { useToggle } from '@Hook/.';

export const WebRTCContext = createContext<WebRTCState>({} as WebRTCState);

export const WebRTCProvider = ({
  children,
  chatRoomId,
}: {
  children: ReactNode;
  chatRoomId: number;
}) => {
  const { component: MeetingToggleButton, state: meetingState } = useMeetingController();
  const { state: micState, toggleState: handleMicToggle } = useToggle();
  const { state: windowState, toggleState: handleWindowToggle } = useToggle();
  const value = {
    MeetingToggleButton,
    meetingState,
    micState,
    windowState,
    handleMicToggle,
    handleWindowToggle,
  } as WebRTCState;

  return <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>;
};
