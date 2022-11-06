import { Video } from './Video';

import { useCamChatState, useCamState, useWindowState } from '@Context/WebRTC';

export const CamChat = () => {
  const { users, videoRef, windowShareVideoRef } = useCamChatState();
  const { camState } = useCamState();
  const { windowState } = useWindowState();

  return (
    <div className='w-[100%] h-[100%]'>
      {camState && (
        <video
          className='rounded-md'
          ref={videoRef}
          muted
          autoPlay
        />
      )}
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
