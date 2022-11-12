import { useEffect, useState } from 'react';

import { registerSocketEvent } from '../registerSocketEvent';

type SenderType = {
  senderId: number;
  name: string;
  profileImage: string;
};

type MessageType = {
  sender: SenderType;
  content: string;
  createAt: Date;
};

export const registerChatSocketEvent = (channel: string) => {
  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setError(false);
      registerSocketEvent('chatInstance', [
        {
          eventName: `sub/chat/message/channel/${channel}`,
          callback: (data: any) => {
            setMessageData((prev) => [...prev, data]);
          },
        },
      ]);
    } catch (e) {
      setError(true);
    }
  }, []);

  return {
    messageData,
    error,
  };
};
