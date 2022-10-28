import io, { Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost';
const PORT = '4000';

export default class ClientSocket {
  socket: Socket | undefined;

  static sendPC: RTCPeerConnection;

  static receivePCs: { [index: string]: RTCPeerConnection };

  static instance: ClientSocket | null;

  constructor(id: string) {
    if (ClientSocket.instance) return ClientSocket.instance;
    this.connect();
    ClientSocket.instance = this;
    this.setUid(id);
  }

  connect() {
    this.socket = io(`${SERVER_URL}:${PORT}`, { transports: ['websocket'] });
  }

  setUid(id: string) {
    this.socket?.emit('setUid', id);
  }
}
