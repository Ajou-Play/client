import type { Client as instance } from 'stompjs';

export type SocketType = 'chatInstance' | 'webRTCInstance' | 'archiveInstance';
type Type = Record<SocketType, null | instance>;

export const Socket: Type = {
  chatInstance: null,
  webRTCInstance: null,
  archiveInstance: null,
};

type WebRTCPCType = {
  sendPC: RTCPeerConnection | null;
  receivePCs: { [index: string]: RTCPeerConnection };
};
export const WebRTCPC: WebRTCPCType = {
  sendPC: null,
  receivePCs: {},
};
