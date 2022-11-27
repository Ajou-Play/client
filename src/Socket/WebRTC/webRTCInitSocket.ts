// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

import { joinCamChat } from './sendMessage';
import { getAnswerEvent, getCandidateEvent, getExistingUsers, getJoinUser } from './util';
import ClientSocket from './webRTCSocket';

const webRTCInitSocket = (
  webRTCJoinState: boolean,
  addUser: Function,
  deleteUser: Function,
  userId: number,
  chatRoomId: string,
) => {
  if (webRTCJoinState) {
    const clientSocket = new ClientSocket(userId);
    joinCamChat(chatRoomId, userId);
    clientSocket.socket!.on('existingUsers', getExistingUsers(addUser, chatRoomId));
    clientSocket.socket!.on('joinUser', getJoinUser(addUser, chatRoomId));
    clientSocket.socket!.on('getCandidate', getCandidateEvent);
    clientSocket.socket!.on('getAnswer', getAnswerEvent);
  }
  if (ClientSocket.instance) {
    const clientSocket = new ClientSocket(userId);
    clientSocket.socket!.off('existingUsers', getExistingUsers(addUser, chatRoomId));
    clientSocket.socket!.off('joinUser', getJoinUser(addUser, chatRoomId));
    clientSocket.socket!.off('getCandidate', getCandidateEvent);
    clientSocket.socket!.off('getAnswer', getAnswerEvent);
    clientSocket.socket!.close();
  }
};

export default webRTCInitSocket;
