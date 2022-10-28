import { Video } from './Video';

import { useCamChatState, useCamState, useMeetingToggleState } from '@Context/WebRTC';

export const CamChat = () => {
  const { users, videoRef } = useCamChatState();
  const { meetingState } = useMeetingToggleState();
  const { camState } = useCamState();

  if (!meetingState) return null;
  return (
    <div>
      {camState && (
        <video
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
