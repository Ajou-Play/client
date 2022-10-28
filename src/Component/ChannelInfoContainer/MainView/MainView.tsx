import { ChannelArchive } from '../Archive';
import { ChannelHome } from '../Home';
import { MainViewProps } from './MainView.type';

import { CamChat } from '@Component/.';
import { useMeetingToggleState } from '@Context/WebRTC';

export const MainView = ({ archiveItems, body }: MainViewProps) => {
  const { meetingState } = useMeetingToggleState();
  return (
    <>
      <div className={`w-[${meetingState ? 30 : 100}%] h-[100%]`}>
        {body === 'Home' ? (
          <ChannelHome archiveItems={archiveItems} />
        ) : (
          <ChannelArchive archiveItems={archiveItems} />
        )}
      </div>
      {meetingState && (
        <div className='box-border pl-3 flex w-[70%]'>
          <div className='camchat-bar w-[10px] h-[100%] cursor-pointer rounded-md' />
          <div className='box-border pl-3'>
            <CamChat />
          </div>
        </div>
      )}
    </>
  );
};
