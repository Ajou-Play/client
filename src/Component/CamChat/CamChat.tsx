import { Video } from './Video';

import { useCamChatState, useCamState, useWindowState } from '@Context/WebRTC';

export const CamChat = () => {
  const { users, videoRef, windowShareVideoRef } = useCamChatState();
  const { camState } = useCamState();
  const { windowState } = useWindowState();

  return (
    <div className='w-[100%] h-[100%] grid grid-cols-video-layout gap-1'>
      {camState && (
        <video
          className='rounded-md  w-[76px] h-[76px]'
          ref={videoRef}
          muted
          autoPlay
        />
      )}
      <div className='rounded-md  w-[76px] h-[76px] bg-black'>1</div>
      <div className='rounded-md  w-[76px] h-[76px] bg-black'>1</div>
      <div className='rounded-md  w-[76px] h-[76px] bg-black'>1</div>
      {windowState && (
        <video
          className='rounded-md'
          ref={windowShareVideoRef}
          muted
          autoPlay
        />
      )}
      {users?.map((user) => (
        <Video
          stream={user.stream}
          key={user.id}
        />
      ))}
    </div>
  );
};
