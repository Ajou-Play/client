import ClientSocket from '../../Socket/WebRTC/socket';
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

// 화면 공유 stream 만들기

export const getWindowShareStream = async ({ videoRef, streamRef }: GetWindowShareStream) => {
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

// 나의 MediaStream 만들기 getLocalStream
export const getLocalStream = async ({ videoRef, streamRef }: GetLocalStream) => {
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

export const senderPC = (stream: MediaStream, addUser: Function) => {
  const { socket } = new ClientSocket('싱글톤');
  if (!socket) return null;
  const callback = (e: RTCPeerConnectionIceEvent) =>
    socket.emit('senderCandidate', {
      candidate: e.candidate,
      // senderSocketID: socket.id,
    });
  const trackCallback = (e: RTCTrackEvent) => addUser(socket.id, e);
  const pc = makePeerConnection(callback, trackCallback, stream);
  return pc;
};
export const receivePC = (id: string, addUser: Function) => {
  const { socket } = new ClientSocket('싱글톤');
  if (!socket) return null;
  const callback = (e: RTCPeerConnectionIceEvent) =>
    socket.emit('receiverCandidate', {
      candidate: e.candidate,
      receiverSocketID: socket.id,
      senderSocketID: id,
    });
  const trackCallback = (e: RTCTrackEvent) => addUser(id, e);
  const pc = makePeerConnection(callback, trackCallback);
  ClientSocket.receivePCs = { ...ClientSocket.receivePCs, [id]: pc };
  return pc;
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

export const registerSdpToPC = async (pc: RTCPeerConnection) => {
  const offer = await createOffer(pc, false);
  return offer;
};

export const createReceiverOffer = async (pc: RTCPeerConnection) => {
  const answer = await createOffer(pc, true);
  return answer;
};

const getCandidateEvent = (pc: RTCPeerConnection, candidate: RTCIceCandidateInit) => {
  if (!candidate) return;
  pc.addIceCandidate(new RTCIceCandidate(candidate));
};

export const getReceiverCandidateEvent = (data: { id: string; candidate: RTCIceCandidateInit }) => {
  const { receivePCs } = ClientSocket;
  const pc: RTCPeerConnection = receivePCs[data.id];
  getCandidateEvent(pc, data.candidate);
};

export const getSenderCandidateEvent = (data: { candidate: RTCIceCandidateInit }) => {
  getCandidateEvent(ClientSocket.sendPC, data.candidate);
};

const registerRemoteDescriptionToPc = async (pc: RTCPeerConnection, sdp: RTCSessionDescription) => {
  await pc.setRemoteDescription(new RTCSessionDescription(sdp));
};

export const getSenderAnswerEvent =
  (pc: RTCPeerConnection) => async (data: { sdp: RTCSessionDescription }) => {
    await registerRemoteDescriptionToPc(pc, data.sdp);
  };

export const getReceiverAnswerEvent = async (data: { id: string; sdp: RTCSessionDescription }) => {
  const { receivePCs } = ClientSocket;
  const pc: RTCPeerConnection = receivePCs[data.id];
  await registerRemoteDescriptionToPc(pc, data.sdp);
};

const registerUser = async (id: string, addUser: Function, chatRoomId: number) => {
  const pc = receivePC(id, addUser);
  const clientSocket = new ClientSocket('싱글톤');
  const answer = await createReceiverOffer(pc as RTCPeerConnection);
  clientSocket.socket!.emit('receiverOffer', {
    sdp: new RTCSessionDescription(answer),
    // receiverSocketID: clientSocket.socket!.id,
    senderSocketID: id,
    roomID: chatRoomId,
  });
};

export const handleAllUserEvent =
  (addUser: Function, chatRoomId: number) =>
  ({ users }: { users: { id: string }[] }) =>
    users.forEach((user) => registerUser(user.id, addUser, chatRoomId));

export const handleUserEnterEvent =
  (addUser: Function, chatRoomId: number) => async (data: { id: string }) =>
    registerUser(data.id, addUser, chatRoomId);

export const handleUserExitEvent = (deleteUser: Function) => (id: string) => {
  const { receivePCs } = ClientSocket;
  if (!receivePCs[id]) receivePCs[id].close();
  delete receivePCs[id];
  deleteUser(id);
};

// 사용자 화면 공유 연결하기
export const windowShareConnection = async ({
  streamRef,
  videoRef,
  addUser,
  chatRoomId,
}: {
  streamRef: React.MutableRefObject<MediaStream | undefined>;
  videoRef: React.RefObject<HTMLVideoElement>;
  addUser: Function;
  chatRoomId: number;
}) => {
  const clientSocket = new ClientSocket('싱글톤');
  if (!clientSocket.socket) return;
  getWindowShareStream({ videoRef, streamRef });
  const sendPc = senderPC(streamRef.current!, addUser);
  if (!sendPc) return;

  ClientSocket.sendPC = sendPc;
  const offer = await registerSdpToPC(sendPc);
  clientSocket.socket!.emit('senderOffer', {
    sdp: offer,
    // senderSocketID: clientSocket.socket.id,
    roomId: chatRoomId,
  });
  clientSocket.socket!.emit('joinRoom', {
    // id: clientSocket.socket!.id,
    chatRoomId,
  });
};

// 사용자 화면 연결하기
export const connection = async ({
  streamRef,
  videoRef,
  addUser,
  chatRoomId,
}: {
  streamRef: React.MutableRefObject<MediaStream | undefined>;
  videoRef: React.RefObject<HTMLVideoElement>;
  addUser: Function;
  chatRoomId: number;
}) => {
  const clientSocket = new ClientSocket('싱글톤');
  if (!clientSocket.socket) return;
  getLocalStream({ streamRef, videoRef });
  const sendPc = senderPC(streamRef.current!, addUser);
  if (!sendPc) return;

  ClientSocket.sendPC = sendPc;
  const offer = await registerSdpToPC(sendPc);
  clientSocket.socket!.emit('senderOffer', {
    sdp: offer,
    // senderSocketID: clientSocket.socket.id,
    roomId: chatRoomId,
  });
  clientSocket.socket!.emit('joinRoom', {
    // id: clientSocket.socket!.id,
    chatRoomId,
  });
};
