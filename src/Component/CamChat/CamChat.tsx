import { Video } from './Video';

import { useCamChatState, useMeetingToggleState } from '@Context/WebRTC';

export const CamChat = () => {
  const { users, videoRef } = useCamChatState();
  const { meetingState } = useMeetingToggleState();

  if (!meetingState) return null;
  return (
    <div>
      <video
        ref={videoRef}
        muted
        autoPlay
      />
      {users?.map((user) => (
        <Video
          stream={user.stream}
          key={user.id}
        />
      ))}
    </div>
  );
};
