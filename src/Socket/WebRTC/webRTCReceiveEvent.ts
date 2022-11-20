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

export const webRTCReceiveEvent = (
  myId: number,
  addUser: Function,
  deleteUser: Function,
  channelId: string,
  cb: Function,
) => {
  registerSocketEvent(
    'webRTCInstance',
    [
      {
        eventName: `/sub/meeting/${channelId}/existingUsers`,
        callback: ({ data: users }: any) => {
          handleAllUserEvent(addUser, users, myId);
        },
      },
      {
        eventName: `/sub/meeting/${channelId}/newUserArrived`,
        callback: ({ user }: any) => {
          handleUserEnterEvent(addUser, user, myId);
        },
      },
      {
        eventName: `/sub/meeting/${channelId}/userLeft`,
        callback: ({ user: { userId } }: any) => {
          handleUserExitEvent(deleteUser, userId);
        },
      },
      {
        eventName: `/sub/meeting/${channelId}/receiveVideoAnswer`,
        callback: ({ user: { userId }, sdpAnswer }: receiveVideoAnswerType) => {
          const pc = myId === Number(userId) ? WebRTCPC.sendPC : WebRTCPC.receivePCs[userId];
          registerRemoteDescriptionToPc(pc as RTCPeerConnection, sdpAnswer);
        },
      },
      {
        eventName: `/sub/meeting/${channelId}/iceCandidate`,
        callback: ({ userId, candidate }: any) => {
          const pc = myId === Number(userId) ? WebRTCPC.sendPC : WebRTCPC.receivePCs[userId];
          getCandidateEvent(pc as RTCPeerConnection, candidate);
        },
      },
    ],
    cb,
  );
};
