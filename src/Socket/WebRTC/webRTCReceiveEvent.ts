import { registerSocketEvent } from '../registerSocketEvent';
import { WebRTCPC } from '../socket';

import {
  getCandidateEvent,
  handleAllUserEvent,
  handleUserEnterEvent,
  handleUserExitEvent,
  registerRemoteDescriptionToPc,
} from '@Context/WebRTC/WebRTC.util';

type userType = { userId: string };
type receiveVideoAnswerType = {
  user: userType;
  sdpAnswer: RTCSessionDescription;
};

export const webRTCReceiveEvent = (myId: number, addUser: Function, deleteUser: Function) => {
  registerSocketEvent('webRTCInstance', [
    {
      eventName: 'existingUsers',
      callback: ({ data: users }: any) => {
        handleAllUserEvent(addUser, users, myId);
      },
    },
    {
      eventName: 'newUserArrived',
      callback: ({ user }: any) => {
        handleUserEnterEvent(addUser, user, myId);
      },
    },
    {
      eventName: 'userLeft',
      callback: ({ user: { userId } }: any) => {
        handleUserExitEvent(deleteUser, userId);
      },
    },
    {
      eventName: 'receiveVideoAnswer',
      callback: ({ user: { userId }, sdpAnswer }: receiveVideoAnswerType) => {
        const pc = myId === Number(userId) ? WebRTCPC.sendPC : WebRTCPC.receivePCs[userId];
        registerRemoteDescriptionToPc(pc as RTCPeerConnection, sdpAnswer);
      },
    },
    {
      eventName: 'iceCandidate',
      callback: ({ userId, candidate }: any) => {
        const pc = myId === Number(userId) ? WebRTCPC.sendPC : WebRTCPC.receivePCs[userId];
        getCandidateEvent(pc as RTCPeerConnection, candidate);
      },
    },
  ]);
};
