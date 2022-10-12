import { Socket } from '.';

export const registerSocketEvent = () => {
  if (!Socket.instance) throw new Error();
  Socket.instance.on('joinNewUser', () => {});
  Socket.instance.on('leaveUser', () => {});
  Socket.instance.on('receiveMessage', () => {});
};
