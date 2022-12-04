import { CHARACTER_LEVEL } from './MeetingController.const';
import { MeetingControllerProps } from './MeetingController.type';

import { useMeetingToggleState } from '@Context/WebRTC';
import { getStorageItem } from '@Util/storage';

export const MeetingController = ({ userLevel }: MeetingControllerProps) => {
  const src = CHARACTER_LEVEL[userLevel];
  const userId = getStorageItem('userId');
  const { MeetingToggleButton, meetingState } = useMeetingToggleState();

  return (
    <div className='absolute box-border mt-[10px] border-t-2 bottom-0 w-[100%] p-4'>
      <div className='border-t-grey-background meetingOff'>
        <div className='flex items-center title'>
          <img
            src={src}
            alt='character'
            className='w-[40px] h-[40px] rounded-lg mr-2 bg-grey-line'
          />
          <span className='text-xl'>{userId}</span>
        </div>
        <MeetingToggleButton />
      </div>
    </div>
  );
};
