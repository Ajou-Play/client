export type WebRTCUser = {
  id: string;
  stream: MediaStream;
};

export type WebRTCState = {
  MeetingToggleButton: () => JSX.Element;
  meetingState: boolean;
  micState: boolean;
  windowState: boolean;
  camState: boolean;
  handleMicToggle: () => void;
  handleWindowToggle: () => void;
  handleCamToggle: () => void;
  users: WebRTCUser[];
  videoRef: React.RefObject<HTMLVideoElement>;
  windowShareVideoRef: React.RefObject<HTMLVideoElement>;
};

export type GetLocalStream = {
  videoRef: React.RefObject<HTMLVideoElement>;
  streamRef: React.MutableRefObject<MediaStream | undefined>;
};

export type GetWindowShareStream = {
  videoRef: React.RefObject<HTMLVideoElement>;
  streamRef: React.MutableRefObject<MediaStream | undefined>;
};
