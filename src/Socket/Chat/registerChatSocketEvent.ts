import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { registerSocketEvent } from '../registerSocketEvent';
import { Socket } from '../socket';

type SenderType = {
  senderId: number;
  name: string;
  profileImage: string;
};

type MessageType = {
  sender: SenderType;
  content: string;
  createdAt: Date;
};

export type ReceiveType = {
  content: string;
  createdAt: Date;
  type: string;
  sender: Pick<SenderType, 'name' | 'profileImage'> & { userId: number };
};

const SOCKET_SERVER = 'https://www.aplay.n-e.kr/api/socket/chat';

export const registerChatSocketEvent = (channel: string) => {
  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      setError(false);
      const sockJS = new SockJS(`${SOCKET_SERVER}`);
      Socket.chatInstance = Stomp.over(sockJS);
      registerSocketEvent('chatInstance', [
        {
          eventName: `/sub/chat/message/channel/${channel}`,
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
                createdAt: new Date(createdAt),
                sender: {
                  senderId,
                  name,
                  profileImage,
                } as SenderType,
              } as MessageType,
            ]);
          },
        },
      ]);
    } catch (e) {
      setError(true);
    }
    return () => {
      // if (!Socket.chatInstance) return;
      // console.log('??');
      // Socket.chatInstance.disconnect(() => {}, {});
    };
  }, [channel]);

  return {
    messageData,
    error,
  };
};
