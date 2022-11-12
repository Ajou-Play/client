import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { Socket } from '..';
import { webRTCReceiveEvent } from './webRTCReceiveEvent';
import { sendJoin, sendLeave } from './webRTCSendEvent';

const SOCKET_SERVER = 'https://localhost:4000';

const webRTCInitSocket = (
  webRTCJoinState: boolean,
  addUser: Function,
  deleteUser: Function,
  userId: number,
  chatRoomId: string,
) => {
  if (webRTCJoinState) {
    const sockJS = new SockJS(`${SOCKET_SERVER}/socket/meeting`);
    Socket.webRTCInstance = Stomp.over(sockJS);
    webRTCReceiveEvent(userId, addUser, deleteUser);
    sendJoin({ eventType: 'joinMeeting', userId, channelId: chatRoomId });
  } else {
    if (!Socket.webRTCInstance) return;
    sendLeave({ eventType: 'leaveMeeting' });
    Socket.webRTCInstance.disconnect(() => {}, {});
    Socket.webRTCInstance = null;
  }
};

export default webRTCInitSocket;
