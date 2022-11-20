import { emitEvent } from '..';

const socketType = 'webRTCInstance';
const SEND_CANDIDATE = '/pub/meeting/onIceCadidate';
const SEND_JOIN = '/pub/meeting/joinMeeting';
const SEND_VIDEO = '/pub/meeting/receiveVideoFrom';
const SEND_LEAVE = '/pub/meeting/leaveMeeting';

type SendCandidate = {
  eventType: typeof SEND_CANDIDATE;
  candidate: any;
  userId: number;
};

type SendJoin = {
  eventType: typeof SEND_JOIN;
  userId: number;
  channelId: string;
};

type SendVideo = {
  eventType: typeof SEND_VIDEO;
  userId: number;
  sdpOffer: RTCSessionDescriptionInit;
};
type SendLeave = {
  eventType: typeof SEND_LEAVE;
};

export const sendCandidate = (body: SendCandidate) =>
  emitEvent({ socketType, eventName: SEND_CANDIDATE, body });

export const sendJoin = (body: SendJoin) => emitEvent({ socketType, eventName: SEND_JOIN, body });
export const sendVideo = (body: SendVideo) =>
  emitEvent({ socketType, eventName: SEND_VIDEO, body });
export const sendLeave = (body: SendLeave) =>
  emitEvent({ socketType, eventName: SEND_LEAVE, body });
