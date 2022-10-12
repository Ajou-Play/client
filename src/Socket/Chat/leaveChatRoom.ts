import { emitEvent } from '../emitEvent';

const eventName = 'leaveChatRoom';
type LeaveChatRoom = { userId: string; chatRoom: string };

export const leaveChatRoom = (body: LeaveChatRoom) => emitEvent({ eventName, body });
