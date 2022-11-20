import { WebRTCPC } from '../../Socket';
import { sendCandidate, sendJoin, sendVideo } from '../../Socket/WebRTC/webRTCSendEvent';
import { PC_CONFIG } from './WebRTC.const';
import { GetLocalStream, GetWindowShareStream } from './WebRTC.type';

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

export const getCandidateEvent = (pc: RTCPeerConnection, candidate: RTCIceCandidateInit) => {
  if (!candidate) return;
  pc.addIceCandidate(new RTCIceCandidate(candidate));
};

export const registerRemoteDescriptionToPc = async (
  pc: RTCPeerConnection,
  sdp: RTCSessionDescription,
) => {
  await pc.setRemoteDescription(new RTCSessionDescription(sdp));
};

export const handleAllUserEvent = (
  addUser: Function,
  { users }: { users: { userId: string }[] },
  myId: number,
) => users.forEach((user) => registerUser(user.userId, addUser, myId));

export const handleUserEnterEvent = (addUser: Function, data: { id: string }, myId: number) =>
  registerUser(data.id, addUser, myId);

const registerUser = async (id: string, addUser: Function, myId: number) => {
  const pc = receivePC(id, addUser, myId);
  const answer = await createReceiverOffer(pc as RTCPeerConnection);
  sendVideo({ eventType: '/pub/meeting/receiveVideoFrom', userId: 0, sdpOffer: answer });
};

const receivePC = (id: string, addUser: Function, myId: number) => {
  const callback = (e: RTCPeerConnectionIceEvent) =>
    sendCandidate({
      eventType: '/pub/meeting/onIceCadidate',
      candidate: e.candidate,
      userId: myId,
    });
  const trackCallback = (e: RTCTrackEvent) => addUser(id, e);
  const pc = makePeerConnection(callback, trackCallback);
  WebRTCPC.receivePCs[id] = pc;
  return pc;
};

export const createReceiverOffer = async (pc: RTCPeerConnection) => {
  const answer = await createOffer(pc, true);
  return answer;
};

export const handleUserExitEvent = (deleteUser: Function, id: string) => {
  WebRTCPC.receivePCs[id].close();
  delete WebRTCPC.receivePCs[id];
  deleteUser(id);
};

// 사용자 화면 공유 연결하기
export const windowShareConnection = async ({
  streamRef,
  videoRef,
  addUser,
  chatRoomId,
  userId,
}: {
  streamRef: React.MutableRefObject<MediaStream | undefined>;
  videoRef: React.RefObject<HTMLVideoElement>;
  addUser: Function;
  chatRoomId: string;
  userId: number;
}) => {
  getWindowShareStream({ videoRef, streamRef });
  const sendPc = senderPC(streamRef.current!, addUser, userId);
  if (!sendPc) return;
  WebRTCPC.sendPC = sendPc;
  const offer = await registerSdpToPC(sendPc);
  // sendJoin({ eventType: 'joinMeeting', userId, channelId: chatRoomId });
  sendVideo({ eventType: '/pub/meeting/receiveVideoFrom', userId, sdpOffer: offer });
};

// 화면 공유 stream 만들기
const getWindowShareStream = async ({ videoRef, streamRef }: GetWindowShareStream) => {
  if (!videoRef.current) return;
  const stream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      width: 76,
      height: 76,
    },
  });
  videoRef.current.srcObject = stream;
  streamRef.current = stream;
};

// 사용자 화면 연결하기
export const connection = async ({
  streamRef,
  videoRef,
  addUser,
  chatRoomId,
  userId,
}: {
  streamRef: React.MutableRefObject<MediaStream | undefined>;
  videoRef: React.RefObject<HTMLVideoElement>;
  addUser: Function;
  chatRoomId: string;
  userId: number;
}) => {
  getLocalStream({ streamRef, videoRef });
  const sendPc = senderPC(streamRef.current!, addUser, userId);
  if (!sendPc) return;
  WebRTCPC.sendPC = sendPc;
  const offer = await registerSdpToPC(sendPc);
  // sendJoin({ eventType: 'joinMeeting', userId, channelId: chatRoomId });
  sendVideo({ eventType: '/pub/meeting/receiveVideoFrom', userId, sdpOffer: offer });
};

// 나의 MediaStream 만들기 getLocalStream
const getLocalStream = async ({ videoRef, streamRef }: GetLocalStream) => {
  if (!videoRef.current) return;
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: 100,
      height: 100,
    },
  });
  videoRef.current.srcObject = stream;
  streamRef.current = stream;
};

export const registerSdpToPC = async (pc: RTCPeerConnection) => {
  const offer = await createOffer(pc, false);
  return offer;
};

const createOffer = async (pc: RTCPeerConnection, isOffer: boolean) => {
  const offer = await pc.createOffer({
    offerToReceiveAudio: !isOffer,
    offerToReceiveVideo: !isOffer,
  });
  const sdp = new RTCSessionDescription(offer);
  // ontrack 발생
  await pc.setLocalDescription(sdp);
  return offer;
};

const senderPC = (stream: MediaStream, addUser: Function, myId: number) => {
  const callback = (e: RTCPeerConnectionIceEvent) =>
    sendCandidate({
      eventType: '/pub/meeting/onIceCadidate',
      candidate: e.candidate,
      userId: myId,
    });
  const trackCallback = (e: RTCTrackEvent) => addUser(myId, e); // 내가 쏘는건데 동작을 해야해?
  const pc = makePeerConnection(callback, trackCallback, stream);
  return pc;
};

const makePeerConnection = (cb: Function, trackCallback: Function, stream?: MediaStream) => {
  const pc = new RTCPeerConnection(PC_CONFIG);

  // peerConnection 생성 이후 발생
  // socket event로 candidate 전송해야함
  pc.onicecandidate = (e) => cb(e);

  if (stream) stream.getTracks().forEach((track) => pc.addTrack(track, stream));

  // pc에 sdp 등록하면 발생
  // e.streams[0]을 user의 stream으로 저장해야함
  pc.ontrack = (e) => trackCallback(e);
  return pc;
};
