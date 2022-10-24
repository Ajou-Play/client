import { createContext, ReactNode, useEffect, useRef, useState } from 'react';

import {
  useCamController,
  useMeetingController,
  useMicController,
  useWindowController,
} from './WebRTC.hook';
import type { WebRTCState, WebRTCUser } from './WebRTC.type';

export const WebRTCContext = createContext<WebRTCState>({} as WebRTCState);

export const WebRTCProvider = ({
  children,
  chatRoomId,
}: {
  children: ReactNode;
  chatRoomId: number;
}) => {
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const localStreamRef = useRef<MediaStream>();
  const { component: MeetingToggleButton, state: meetingState } = useMeetingController();
  const { micState, handleMicToggle } = useMicController(localStreamRef);
  const { windowState, handleWindowToggle } = useWindowController(localStreamRef);
  const { camState, handleCamToggle } = useCamController(localStreamRef);
  const value = {
    users,
    MeetingToggleButton,
    meetingState,
    micState,
    windowState,
    handleMicToggle,
    handleWindowToggle,
    camState,
    handleCamToggle,
  } as WebRTCState;

  useEffect(() => {
    if (meetingState) {
      // 나의 Media 만들기
      // Peer Connection 생성하기
      // offer 만들기
      // 참여 event 보내기 => sdp, roomid 보내기
      // 응답 event 받아서 pc 생성
      // pc에 stream 저장
      console.log('webRTC 온', chatRoomId);
    } else {
      // leave event 보내기
      console.log('webRTC 오프', chatRoomId);
    }
  }, [meetingState]);

  return <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>;
};
