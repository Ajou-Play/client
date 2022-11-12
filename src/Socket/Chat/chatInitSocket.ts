import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { Socket } from '..';
import { registerChatSocketEvent } from './registerChatSocketEvent';

const SOCKET_SERVER = 'https://localhost:4000';
const TEMP_CHANNEL_ID = '1';

const initSocket = (chatJoinState: boolean) => {
  useEffect(() => {
    if (chatJoinState) {
      const sockJS = new SockJS(`${SOCKET_SERVER}/webSocket`);
      Socket.chatInstance = Stomp.over(sockJS);
      registerChatSocketEvent(TEMP_CHANNEL_ID);
    } else {
      if (!Socket.chatInstance) return;
      Socket.chatInstance.disconnect(() => {}, {});
    }
  }, [chatJoinState]);
};

export default initSocket;
