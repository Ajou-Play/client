import { emitEvent } from '../emitEvent';

const eventName = 'sendMessage';
type SendMessage = { userId: string; message: string };

export const sendMessage = (body: SendMessage) => emitEvent({ eventName, body });
