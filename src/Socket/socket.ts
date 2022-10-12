import type { Socket as type } from 'socket.io-client';

type SocketType = { instance: null | type };

export const Socket: SocketType = { instance: null };
