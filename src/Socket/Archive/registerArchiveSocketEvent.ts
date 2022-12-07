import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { registerSocketEvent } from '../registerSocketEvent';
import { Socket } from '../socket';

import { MessageType } from '@Component/WindowContainer/MessageWindow/MessageWindow.type';
import { ReceiveType } from '@Socket/Chat/registerChatSocketEvent';

const SOCKET_SERVER = 'https://www.aplay.n-e.kr/api/socket/chat';

export const registerArchiveSocketEvent = (channel: string, archive: string) => {
  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      setError(false);
      const sockJS = new SockJS(`${SOCKET_SERVER}`);
      Socket.archiveInstance = Stomp.over(sockJS);
      registerSocketEvent('archiveInstance', [
        {
          eventName: `/sub/archive/${archive}/update`,
          callback: (data: { body: ReceiveType }) => {
            const message = JSON.parse(JSON.parse(JSON.stringify(data.body)));
            const {
              content,
              createdAt,
              type,
              sender: { userId: senderId, name, profileImage },
            } = message;

            setMessageData((prev) => [
              ...prev,
              {
                content,
                createdAt,
                sender: {
                  senderId,
                  name,
                  profileImage,
                } as any,
              } as MessageType,
            ]);
          },
        },
      ]);
    } catch (e) {
      setError(true);
    }
  }, [channel]);

  return {
    messageData,
    error,
  };
};
