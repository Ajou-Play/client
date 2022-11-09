import { BasicTeamInfo, CamChatContainer } from '..';
import { MeetingController } from '../MeetingController';
import { TeamInfoContainerProps } from './TeamInfoContainer.type';

import { WebRTCProvider } from '@Context/WebRTC';

export const TeamInfoContainer = ({
  channelList,
  channelSelect,
  handleChangeChannelSelect,
  teamName,
}: TeamInfoContainerProps) => (
  <div className='min-w-[272px]'>
    <div className='h-[100vh] w-[100%] pt-4 px-4 box-border'>
      <div className='bg-main-color h-[50px] text-white p-4 box-border leading-4 font-extrabold text-base rounded-lg'>
        {teamName}
      </div>
      <BasicTeamInfo
        ChannelList={channelList}
        channelSelect={channelSelect}
        handleChangeChannelSelect={handleChangeChannelSelect}
      />
    </div>
    <div className='absolute bottom-0 min-w-[272px]'>
      <WebRTCProvider chatRoomId={channelSelect}>
        <CamChatContainer />
        <MeetingController
          userId='aa'
          userLevel={1}
        />
      </WebRTCProvider>
    </div>
  </div>
);
