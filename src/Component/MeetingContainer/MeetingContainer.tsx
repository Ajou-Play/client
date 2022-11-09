import { CamChatContainer } from '..';
import { MeetingContainerProps } from './MeetingContainer.type';

import { MeetingController } from '@Component/MeetingController';
import { WebRTCProvider } from '@Context/WebRTC';

export const MeetingContainer = ({ chatRoomId }: MeetingContainerProps) => (
  <WebRTCProvider chatRoomId={chatRoomId}>
    <MeetingController
      userId='aa'
      userLevel={1}
    />
    <CamChatContainer />
  </WebRTCProvider>
);
