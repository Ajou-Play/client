import { emitEvent } from '../emitEvent';

const eventName = 'joinChatRoom';
type JoinChatRoom = { userId: string; chatRoom: string };

export const joinChatRoom = (body: JoinChatRoom) => emitEvent({ eventName, body });
