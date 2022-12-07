/* eslint-disable jsx-a11y/media-has-caption */
import { Video } from './Video';

import { useCamChatState, useCamState, useWindowState } from '@Context/WebRTC';

export const CamChat = () => {
  const { users, videoRef, windowShareVideoRef } = useCamChatState();
  const { camState } = useCamState();
  const { windowState } = useWindowState();
  return (
    <div className='w-[640px] h-[100%] flex overflow-auto z-999'>
      {camState && (
        <video
          className='rounded-full  w-[100px] h-[100px] mr-2'
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
