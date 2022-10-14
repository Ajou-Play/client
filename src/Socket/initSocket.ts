import SocketIo from 'socket.io-client';

import { registerSocketEvent } from './registerSocketEvent';

import { Socket } from '.';

const SOCKET_SERVER = 'http://localhost:4000';

const initSocket = (joinState: boolean) => {
  Socket.instance = joinState ? SocketIo(SOCKET_SERVER, { transports: ['websocket'] }) : null;
  if (joinState) registerSocketEvent();
};

export default initSocket;
