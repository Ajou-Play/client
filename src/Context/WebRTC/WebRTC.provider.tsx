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
      // 나의 MediaStream 만들기 getLocalStream({videoRef,streamRef})
      // Peer Connection 생성하기 pc = senderPC(localStreamRef.current) => candidate 전송해야함
      // offer 만들기 offer = registerSdpToPC(pc)
      // 참여 event 보내기 => offer, roomid 보내기
      // 응답 event 받아서 pc 생성 pc = receivePC()
      // answer 만들기 answer = createReceiverOffer(pc)
      // 응답 event 보내기 => answer, roomid 보내기

      // candidate 수신하면
      // pc에 stream 저장 상대 접속 발생하면 ,
      console.log('webRTC 온', chatRoomId);
    } else {
      // leave event 보내기
      console.log('webRTC 오프', chatRoomId);
    }
  }, [meetingState]);

  return <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>;
};
