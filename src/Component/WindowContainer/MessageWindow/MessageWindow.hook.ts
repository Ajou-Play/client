import { useEffect, useState } from 'react';

import { MessageType } from './MessageWindow.type';
import { getMessageHistory } from './MessageWindow.util';

export const useGetMessageHistory = (channelId: string) => {
  const [messageHistory, setMessageHistory] = useState<MessageType[]>([]);

  useEffect(() => {
    getMessageHistory(channelId)
      .then(setMessageHistory)
      .catch((e) => setMessageHistory([]));
  }, []);

  return messageHistory;
};
