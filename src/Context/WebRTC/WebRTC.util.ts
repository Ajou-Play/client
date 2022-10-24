// 나의 Media 만들기
// Peer Connection 생성하기
// offer 만들기
// 참여 event 보내기 => sdp, roomid 보내기
// 응답 event 받아서 pc 생성
// pc에 stream 저장

export const muteMic = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  if (!ref || !ref.current) return;
  ref.current.getAudioTracks().forEach((track: MediaStreamTrack) => {
    track.enabled = !track.enabled;
  });
};

export const muteCam = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  if (!ref || !ref.current) return;
  ref.current.getVideoTracks().forEach((track: MediaStreamTrack) => {
    track.enabled = !track.enabled;
  });
};

export const muteWindow = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  if (!ref || !ref.current) return;
  console.log('1');
};
