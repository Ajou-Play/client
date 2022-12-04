import { CamChatContainer } from '..';

import { MeetingController } from '@Component/MeetingController';
import { WebRTCProvider } from '@Context/WebRTC';

export const MeetingContainer = () => (
  <WebRTCProvider>
    <MeetingController userLevel={1} />
    <CamChatContainer />
  </WebRTCProvider>
);
