// import { CamChat } from '..';

import { useCheckCamChat } from '@Context/WebRTC';

export const CamChatContainer = () => {
  const camChatState = useCheckCamChat();
  if (!camChatState) return null;
  return (
    <div className='fixed bottom-[50px] h-[150px] left-[50%] flex translate-x-[-30%]'>
      <iframe
        src='https://www.aplay.n-e.kr/meet'
        title='화상채팅'
        className='w-[800px] h-[100%] flex overflow-auto z-999'
      />
      {/* <CamChat /> */}
    </div>
  );
};
