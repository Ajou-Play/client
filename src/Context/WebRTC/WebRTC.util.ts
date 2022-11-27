import { PC_CONFIG } from './WebRTC.const';
import { GetLocalStream, GetWindowShareStream } from './WebRTC.type';

import { sendCandidate, sendOffer } from '@Socket/WebRTC/sendMessage';
import ClientSocket from '@Socket/WebRTC/webRTCSocket';
import { getStorageItem } from '@Util/storage';

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
  sdp: string,
  // my: boolean,
) => {
  pc.setRemoteDescription(
    new RTCSessionDescription({
      type: 'answer',
      // type: my ? 'answer' : 'offer',
      sdp,
    }),
  );
  console.log(pc);
};

export const handleAllUserEvent = (addUser: Function, users: number[], chatRoomId: string) =>
  users.forEach((user) => registerUser(user, addUser, chatRoomId));

export const handleUserEnterEvent = (addUser: Function, data: number, chatRoomId: string) =>
  registerUser(data, addUser, chatRoomId);

const registerUser = async (id: number, addUser: Function, chatRoomId: string) => {
  const myId = Number(getStorageItem('userId'));
  const pc = receivePC(id, addUser, myId, chatRoomId);
  const answer = await createReceiverOffer(pc as RTCPeerConnection);
  sendOffer({ sdp: answer, userId: id, myId, chatRoomId });
};

const receivePC = (id: number, addUser: Function, myId: number, chatRoomId: string) => {
  const callback = (e: RTCPeerConnectionIceEvent) => {
    sendCandidate(e.candidate, myId, myId, chatRoomId);
  };
  const trackCallback = (e: RTCTrackEvent) => {
    console.log(e);
    addUser(id, e);
  };
  const pc = makePeerConnection(callback, trackCallback);
  ClientSocket.receivePC[id] = pc;
  return pc;
};

export const createReceiverOffer = async (pc: RTCPeerConnection) => {
  const answer = await createOffer(pc, true);
  return answer;
};

export const handleUserExitEvent = (deleteUser: Function, id: string) => {
  ClientSocket.receivePC[id].close();
  delete ClientSocket.receivePC[id];
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
  await getWindowShareStream({ videoRef, streamRef });
  const sendPc = senderPC(streamRef.current!, addUser, userId, chatRoomId);
  if (!sendPc) return;
  ClientSocket.sendPC = sendPc;
  const offer = await registerSdpToPC(sendPc);
  sendOffer({ sdp: offer, userId, myId: userId, chatRoomId });
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
  await getLocalStream({ streamRef, videoRef });
  const sendPc = senderPC(streamRef.current!, addUser, userId, chatRoomId);
  if (!sendPc) return;
  ClientSocket.sendPC = sendPc;
  const offer = await registerSdpToPC(sendPc);
  sendOffer({ sdp: offer, userId, myId: userId, chatRoomId });
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
  pc.setLocalDescription(sdp);
  return offer;
};

const senderPC = (stream: MediaStream, addUser: Function, myId: number, chatRoomId: string) => {
  const callback = (e: RTCPeerConnectionIceEvent) =>
    sendCandidate(e.candidate, myId, myId, chatRoomId);
  const trackCallback = (e: RTCTrackEvent) => console.log(e);
  // const trackCallback = (e: RTCTrackEvent) => addUser(myId, e); // 내가 쏘는건데 동작을 해야해?
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
