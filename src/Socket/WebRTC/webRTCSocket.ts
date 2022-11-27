import io, { Socket } from 'socket.io-client';

const SERVER_URL = 'https://localhost';
const PORT = '4000';

export default class ClientSocket {
  socket: Socket | undefined;

  static sendPC: RTCPeerConnection | null;

  static receivePC: { [index: string]: RTCPeerConnection } = {};

  // eslint-disable-next-line no-use-before-define
  static instance: ClientSocket | null;

  constructor(id: number) {
    // eslint-disable-next-line no-constructor-return
    if (ClientSocket.instance) return ClientSocket.instance;
    this.connect();
    ClientSocket.instance = this;
    this.setUid(id);
  }

  connect() {
    this.socket = io(`${SERVER_URL}:${PORT}`, { transports: ['websocket'] });
  }

  setUid(id: number) {
    this.socket?.emit('setUid', id);
  }
}
