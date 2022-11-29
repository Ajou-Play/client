import ClientSocket from './webRTCSocket';

import { handleAllUserEvent, handleUserEnterEvent } from '@Context/WebRTC/WebRTC.util';
import { getStorageItem } from '@Util/storage';

export const getExistingUsers = (addUser: Function, chatRoomId: string) => (users: number[]) => {
  console.log('getExistingUsers : ', users);
  handleAllUserEvent(addUser, users, chatRoomId);
};
export const getJoinUser = (addUser: Function, chatRoomId: string) => (user: number) => {
  console.log('getJoinUser : ', user);
  handleUserEnterEvent(addUser, user, chatRoomId);
};
export const getCandidateEvent = ({ candidate, userId }: any) => {
  console.log('getCandidateEvent 발생함? :', userId);
  const myId = Number(getStorageItem('userId'));
  const pc = userId === myId ? ClientSocket.sendPC : ClientSocket.receivePC[userId];
  console.log('getCandidate PC : ', pc);
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
