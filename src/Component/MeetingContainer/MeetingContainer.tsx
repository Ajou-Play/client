import { CamChatContainer } from '..';
import { MeetingContainerProps } from './MeetingContainer.type';

import { MeetingController } from '@Component/MeetingController';
import { WebRTCProvider } from '@Context/WebRTC';

export const MeetingContainer = ({ chatRoomId }: MeetingContainerProps) => (
  <div className='absolute left-[90px] bottom-0 min-w-[272px]'>
    <WebRTCProvider chatRoomId={chatRoomId}>
      <CamChatContainer />
      <MeetingController
        userId='aa'
        userLevel={1}
      />
    </WebRTCProvider>
  </div>
);
