import { CamChat } from '..';

import { useCheckCamChat } from '@Context/WebRTC';

export const CamChatContainer = () => {
  const camChatState = useCheckCamChat();
  if (!camChatState) return null;
  return (
    <div className='fixed bottom-[50px] left-[50%] flex translate-x-[-30%]'>
      <CamChat />
    </div>
  );
};
