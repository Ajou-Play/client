import { createContext, ReactNode } from 'react';

import { useMeetingController } from './WebRTC.hook';
import type { WebRTCState } from './WebRTC.type';

export const WebRTCContext = createContext<WebRTCState>({} as WebRTCState);

export const WebRTCProvider = ({ children }: { children: ReactNode }) => {
  const { component: MeetingToggleButton, state: meetingState } = useMeetingController();

  const value = {
    MeetingToggleButton,
    meetingState,
  } as WebRTCState;

  return <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>;
};
