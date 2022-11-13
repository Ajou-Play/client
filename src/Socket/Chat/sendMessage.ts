import { emitEvent } from '../emitEvent';

const eventName = 'pub/chat/message';
const socketType = 'chatInstance';
type SendMessage = {
  type: 'TALK' | 'JOIN' | 'QUIT';
  channelId: number;
  senderId: number;
  content: string;
};

export const sendMessage = (body: SendMessage) => emitEvent({ socketType, eventName, body });
