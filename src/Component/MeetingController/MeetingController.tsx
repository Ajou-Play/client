import { CHARACTER_LEVEL } from './MeetingController.const';
import { MeetingControllerProps } from './MeetingController.type';

import { useCamState, useMeetingToggleState, useMicState, useWindowState } from '@Context/WebRTC';
import { getStorageItem } from '@Util/storage';

const iconStyle = 'w-[20px] h-[20px] cursor-pointer';
const MuteButton = () => {
  const { micState, handleMicToggle } = useMicState();

  return (
    <div className='flex items-center muteButton'>
      <div
        className='mr-4'
        onClick={handleMicToggle}
        aria-hidden
        title={micState ? '음소거' : '음소거 해제'}
      >
        <img
          src={micState ? '/asset/meeting/micOn.svg' : '/asset/meeting/micOff.svg'}
          alt='mic'
          className={iconStyle}
        />
      </div>
    </div>
  );
};

const ShareDisplayButton = () => {
  const { windowState, handleWindowToggle } = useWindowState();

  return (
    <div className='flex justify-between shareButton'>
      <div>
        <img
          src={windowState ? '/asset/meeting/windowOn.svg' : '/asset/meeting/windowOff.svg'}
          alt='mic'
          className={iconStyle}
          title={windowState ? '화면공유 중단' : '화면공유'}
          onClick={handleWindowToggle}
          aria-hidden
        />
      </div>
    </div>
  );
};

const CamButton = () => {
  const { camState, handleCamToggle } = useCamState();

  return (
    <div className='flex justify-between camButton'>
      <div>
        <img
          src={camState ? '/asset/meeting/camOn.svg' : '/asset/meeting/camOff.svg'}
          alt='mic'
          title={camState ? '화상채팅 중단' : '화상채팅'}
          onClick={handleCamToggle}
          aria-hidden
        />
      </div>
    </div>
  );
};

export const MeetingController = ({ userLevel }: MeetingControllerProps) => {
  const src = CHARACTER_LEVEL[userLevel];
  const userId = getStorageItem('userId');
  const { MeetingToggleButton, meetingState } = useMeetingToggleState();

  return (
    <div className='absolute left-[90px] bottom-0 min-w-[272px] border-t-grey-background border-t-2 p-4 box-border'>
      <div className={`${meetingState ? 'meetingOn' : 'meetingOff'}  p-4 box-border`}>
        <div className='flex items-center title'>
          <img
            src={src}
            alt='character'
            className='w-[30px] h-[30px] rounded-lg mr-2'
          />
          <span className='text-xl'>{userId}</span>
        </div>
        {meetingState && <MuteButton />}
        {meetingState && <ShareDisplayButton />}
        {meetingState && <CamButton />}
        <MeetingToggleButton />
      </div>
    </div>
  );
};
