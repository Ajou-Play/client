import { Video } from './Video';

import { useCamChatState, useCamState, useWindowState } from '@Context/WebRTC';

export const CamChat = () => {
  const { users, videoRef, windowShareVideoRef } = useCamChatState();
  const { camState } = useCamState();
  const { windowState } = useWindowState();

  return (
    <div className='w-[100%] h-[100%] flex'>
      {camState && (
        <video
          className='rounded-full  w-[100px] h-[100px] mr-2'
          ref={videoRef}
          muted
          autoPlay
        />
      )}
      <div className='rounded-full  w-[100px] h-[100px] mr-2 bg-black'>1</div>
      <div className='rounded-full  w-[100px] h-[100px] mr-2 bg-black'>1</div>
      <div className='rounded-full  w-[100px] h-[100px] mr-2 bg-black'>1</div>
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
