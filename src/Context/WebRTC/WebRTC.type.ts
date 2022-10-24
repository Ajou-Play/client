export type WebRTCState = {
  MeetingToggleButton: () => JSX.Element;
  meetingState: boolean;
  micState: boolean;
  windowState: boolean;
  handleMicToggle: () => void;
  handleWindowToggle: () => void;
};
