import { useEffect, useState } from 'react';

import { useSocket } from '@Socket/useSocket';

type SenderType = {
  senderId: number;
  name: string;
  profileImage: string;
};

type MessageType = {
  sender: SenderType;
  content: string;
  createdAt: number;
};

export type ReceiveType = {
  content: string;
  createdAt: number;
  type: string;
  sender: Pick<SenderType, 'name' | 'profileImage'> & { userId: number };
};

type SendMessage = {
  type: 'TALK' | 'JOIN' | 'QUIT';
  channelId: number;
  senderId: number;
  content: string;
};

export const useChat = (channel: string) => {
  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const socket = useSocket();

  const sendMessage = (body: SendMessage) =>
    socket?.emit(`send`, {
      channel,
      body,
    });

  useEffect(() => {
    if (socket === null) return;
    socket.on('connect', () => {
      console.log('connection server', socket.id);
    });
    socket.emit('init', { channel });
  }, [socket, channel]);

  useEffect(() => {
    if (socket === null) return;
    socket.on('receive', (body: ReceiveType) => {
      const message = body;
      const {
        content,
        createdAt,
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
          } as SenderType,
        } as MessageType,
      ]);
    });
  }, [socket, channel]);

  return {
    messageData,
    sendMessage,
    error: socket === null,
  };
};
