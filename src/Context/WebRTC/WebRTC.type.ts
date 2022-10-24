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
};
