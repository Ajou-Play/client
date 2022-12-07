import ClientSocket from './webRTCSocket';

import { handleAllUserEvent, handleUserEnterEvent } from '@Context/WebRTC/WebRTC.util';
import { getStorageItem } from '@Util/storage';

export const getExistingUsers = (addUser: Function, chatRoomId: string) => (users: number[]) => {
  handleAllUserEvent(addUser, users, chatRoomId);
};
export const getJoinUser = (addUser: Function, chatRoomId: string) => (user: number) => {
  handleUserEnterEvent(addUser, user, chatRoomId);
};
export const getCandidateEvent = ({ candidate, userId }: any) => {
  const myId = Number(getStorageItem('userId'));
  const pc = userId === myId ? ClientSocket.sendPC : ClientSocket.receivePC[userId];
  (pc as RTCPeerConnection).addIceCandidate(new RTCIceCandidate(candidate));
};
export const getAnswerEvent = ({
  sdp,
  userId,
}: {
  sdp: RTCSessionDescriptionInit;
  userId: number;
}) => {
  const myId = Number(getStorageItem('userId'));
  const pc = userId === myId ? ClientSocket.sendPC : ClientSocket.receivePC[userId];
  (pc as RTCPeerConnection).setRemoteDescription(sdp);
};

export const sendMessage = (eventName: string, body: any) => {
  const clientSocket = new ClientSocket(0);
  if (!clientSocket.socket) return;
  clientSocket.socket!.emit(eventName, body);
};

export const joinCamChat = (chatRoomId: string, userId: number) =>
  sendMessage('joinCamChat', { chatRoomId, userId });
export const sendCandidate = (
  candidate: RTCIceCandidate | null,
  userId: number,
  myId: number,
  chatRoomId: string,
) => sendMessage('sendCandidate', { candidate, userId, myId, chatRoomId });

export const sendOffer = ({
  sdp,
  userId,
  myId,
  chatRoomId,
}: {
  sdp: RTCSessionDescriptionInit;
  userId: number;
  myId: number;
  chatRoomId: string;
}) => sendMessage('sendOffer', { sdp, userId, myId, chatRoomId });
