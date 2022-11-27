import ClientSocket from './webRTCSocket';

const sendMessage = (eventName: string, body: any) => {
  const clientSocket = new ClientSocket(0);
  if (!clientSocket.socket) return;
  clientSocket.socket!.emit(eventName, body);
};

export const joinCamChat = (chatRoomId: string, userId: number) =>
  sendMessage('joinCamChat', { chatRoomId, userId });

export const sendCandidate = (
  candidate: RTCIceCandidate | null,
  userId: number,
  myId: number,
  chatRoomId: string,
) => sendMessage('sendCandidate', { candidate, userId, myId, chatRoomId });

export const sendOffer = ({
  sdp,
  userId,
  myId,
  chatRoomId,
}: {
  sdp: RTCSessionDescriptionInit;
  userId: number;
  myId: number;
  chatRoomId: string;
}) => sendMessage('sendOffer', { sdp, userId, myId, chatRoomId });
