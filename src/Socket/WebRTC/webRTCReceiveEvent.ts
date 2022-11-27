import { registerSocketEvent } from '../registerSocketEvent';
import { WebRTCPC } from '../socket';

import {
  getCandidateEvent,
  handleAllUserEvent,
  handleUserEnterEvent,
  handleUserExitEvent,
  registerRemoteDescriptionToPc,
} from '@Context/WebRTC/WebRTC.util';
import { socketDataPasing } from '@Socket/Util';

type userType = { userId: string };
type receiveVideoAnswerBodyType = {
  user: userType;
  sdpAnswer: RTCSessionDescription;
};
type receiveVideoAnswerType = {
  body: receiveVideoAnswerBodyType;
};

export const webRTCReceiveEvent = (
  myId: number,
  addUser: Function,
  deleteUser: Function,
  // channelId: string,
  cb: Function,
) => {
  registerSocketEvent(
    'webRTCInstance',
    [
      {
        eventName: `/sub/meeting/user/${myId}/existingUsers`,
        callback: (data: any) => {
          const { data: users } = socketDataPasing(data);
          console.log(users);
          handleAllUserEvent(addUser, users, myId);
        },
      },
      {
        eventName: `/sub/meeting/user/${myId}/newUserArrived`,
        callback: (data: any) => {
          const { user } = socketDataPasing(data);
          handleUserEnterEvent(addUser, user, myId);
        },
      },
      {
        eventName: `/sub/meeting/user/${myId}/userLeft`,
        callback: (data: any) => {
          const {
            user: { userId },
          } = socketDataPasing(data);
          handleUserExitEvent(deleteUser, userId);
        },
      },
      {
        eventName: `/sub/meeting/user/${myId}/receiveVideoAnswer`,
        callback: (data: receiveVideoAnswerType) => {
          const {
            user: { userId },
            sdpAnswer,
          } = socketDataPasing(data);
          const pc = myId === Number(userId) ? WebRTCPC.sendPC : WebRTCPC.receivePCs[userId];

          registerRemoteDescriptionToPc(
            pc as RTCPeerConnection,
            sdpAnswer,
            // myId === Number(userId),
          );
        },
      },
      {
        eventName: `/sub/meeting/user/${myId}/iceCandidate`,
        callback: (data: any) => {
          const { userId, candidate } = socketDataPasing(data);
          const pc = myId === Number(userId) ? WebRTCPC.sendPC : WebRTCPC.receivePCs[userId];
          getCandidateEvent(pc as RTCPeerConnection, candidate);
        },
      },
    ],
    cb,
  );
};
