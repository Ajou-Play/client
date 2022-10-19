import { registerSocketEvent } from '../registerSocketEvent';

export const registerChatSocketEvent = (channel: string) =>
  registerSocketEvent('chatInstance', [
    {
      eventName: `sub/chat/message/channel/${channel}`,
      callback: ({ type, channelId, senderId, content }: any) => {
        console.log(type);
        console.log(channelId);
        console.log(senderId);
        console.log(content);
      },
    },
  ]);
