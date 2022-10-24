import { PC_CONFIG } from './WebRTC.const';
import { GetLocalStream } from './WebRTC.type';

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

// 나의 MediaStream 만들기 getLocalStream
export const getLocalStream = async ({ videoRef, streamRef }: GetLocalStream) => {
  if (!videoRef.current) return;
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {
      width: 240,
      height: 240,
    },
  });
  if (videoRef) videoRef.current.srcObject = stream;
  streamRef.current = stream;
};

const makePeerConnection = (stream?: MediaStream) => {
  const pc = new RTCPeerConnection(PC_CONFIG);

  // peerConnection 생성 이후 발생
  pc.onicecandidate = (e) => {
    if (e.candidate) {
      // socket event로 candidate 전송해야함
    }
  };

  if (stream) {
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });
  }

  // pc에 sdp 등록하면 발생
  pc.ontrack = (e) => {
    // e.streams[0]을 user의 stream으로 저장해야함
  };
  return pc;
};

export const senderPC = (stream: MediaStream) => {
  const pc = makePeerConnection(stream);
};
export const receivePC = () => {
  const pc = makePeerConnection();
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
  // 등록후 offer와 chatRoomID에 소켓 이벤트 발생
};

export const createReceiverOffer = async (pc: RTCPeerConnection) => {
  const answer = await createOffer(pc, true);
  // answer를 chatRoomId에 소켓 이벤트 발생
};

const getCandidateEvent = (pc: RTCPeerConnection, candidate: RTCIceCandidateInit) => {
  if (!candidate) return;
  pc.addIceCandidate(new RTCIceCandidate(candidate));
};

export const getReceiverCandidateEvent =
  (pc: RTCPeerConnection) => async (data: { id: string; candidate: RTCIceCandidateInit }) =>
    getCandidateEvent(pc, data.candidate);

export const getSenderCandidateEvent =
  (pc: RTCPeerConnection) => async (data: { candidate: RTCIceCandidateInit }) =>
    getCandidateEvent(pc, data.candidate);

const registerRemoteDescriptionToPc = async (pc: RTCPeerConnection, sdp: RTCSessionDescription) => {
  await pc.setRemoteDescription(new RTCSessionDescription(sdp));
};

export const getSenderAnswerEvent =
  (pc: RTCPeerConnection) => async (data: { sdp: RTCSessionDescription }) => {
    await registerRemoteDescriptionToPc(pc, data.sdp);
  };

export const getReceiverAnswerEvent =
  (pc: RTCPeerConnection) => async (data: { id: string; sdp: RTCSessionDescription }) => {
    await registerRemoteDescriptionToPc(pc, data.sdp);
  };
