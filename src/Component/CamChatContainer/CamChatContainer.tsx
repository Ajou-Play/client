import { CamChat } from '..';

import { useCheckCamChat } from '@Context/WebRTC';

export const CamChatContainer = () => {
  const camChatState = useCheckCamChat();
  if (!camChatState) return null;
  return (
    <div className='border-t-2 p-4 box-border'>
      <CamChat />
    </div>
  );
};
