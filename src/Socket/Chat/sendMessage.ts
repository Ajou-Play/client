import { emitEvent } from '../emitEvent';

const eventName = 'pub/chat/message';
const socketType = 'chatInstance';
type SendMessage = { userId: string; message: string };

export const sendMessage = (body: SendMessage) => emitEvent({ socketType, eventName, body });
