import { Video } from './Video';

import { useCamChatState, useCamState } from '@Context/WebRTC';

export const CamChat = () => {
  const { users, videoRef } = useCamChatState();
  const { camState } = useCamState();

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
      {users?.map((user) => (
        <Video
          stream={user.stream}
          key={user.id}
        />
      ))}
    </div>
  );
};
