import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { Socket } from '..';
import { webRTCReceiveEvent } from './webRTCReceiveEvent';
import { sendJoin, sendLeave } from './webRTCSendEvent';

const SOCKET_SERVER = 'https://www.aplay.n-e.kr/api/socket/meeting';

const webRTCInitSocket = (
  webRTCJoinState: boolean,
  addUser: Function,
  deleteUser: Function,
  userId: number,
  chatRoomId: string,
) => {
  if (webRTCJoinState) {
    const sockJS = new SockJS(`${SOCKET_SERVER}`);
    Socket.webRTCInstance = Stomp.over(sockJS);
    webRTCReceiveEvent(userId, addUser, deleteUser, chatRoomId, () =>
      sendJoin({ eventType: '/pub/meeting/joinMeeting', userId, channelId: chatRoomId }),
    );
  } else {
    if (!Socket.webRTCInstance) return;
    sendLeave({ eventType: '/pub/meeting/leaveMeeting' });
    Socket.webRTCInstance.disconnect(() => {}, {});
    Socket.webRTCInstance = null;
  }
};

export default webRTCInitSocket;
