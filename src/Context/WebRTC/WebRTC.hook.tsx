import { motion } from 'framer-motion';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import ClientSocket from '../../Socket/WebRTC/socket';
import { WebRTCContext } from './WebRTC.provider';
import { WebRTCUser } from './WebRTC.type';
import {
  connection,
  getReceiverAnswerEvent,
  getReceiverCandidateEvent,
  getSenderAnswerEvent,
  getSenderCandidateEvent,
  handleAllUserEvent,
  handleUserEnterEvent,
  handleUserExitEvent,
  muteCam,
  muteMic,
  muteWindow,
  windowShareConnection,
} from './WebRTC.util';

import { useToggle } from '@Hook/.';

const nickName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const myId = nickName[Math.floor(Math.random() * nickName.length)];

const getUrlByMeetingState = (flag: boolean) => (flag ? 'Meeting/meetingOn' : 'Meeting/meetingOff');
export const useMeetingController = () => {
  const { state: meetingState, toggleState } = useToggle();

  const MeetingToggleButton = () => (
    <div
      className={`w-[70px] h-[40px] rounded-[30px] border border-primary-lightOrange flex items-center cursor-pointer bg-primary-${
        meetingState ? 'orange' : 'lightOrange'
      } mettingToggleButton`}
      onClick={toggleState}
      aria-hidden
      title='회의 나가기'
    >
      <motion.img
        animate={{ x: meetingState ? 33 : 5 }}
        src={`/asset/${getUrlByMeetingState(meetingState)}.svg`}
        alt='meetingImg'
        className='w-[30px] h-[30px]'
      />
    </div>
  );

  useEffect(() => {
    if (meetingState) {
      const clientSocket = new ClientSocket(myId);
    }
    return () => {
      if (meetingState) {
        const clientSocket = new ClientSocket(myId);
        clientSocket.socket!.disconnect();
        ClientSocket.instance = null;
      }
    };
  }, [meetingState]);
  return {
    state: meetingState,
    component: MeetingToggleButton,
  };
};

export const useMicController = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  const { state: micState, toggleState: handleMicToggle } = useToggle(false);
  useEffect(() => {
    muteMic(ref);
  }, [micState]);
  return { micState, handleMicToggle };
};

export const useCamController = (
  streamRef: React.MutableRefObject<MediaStream | undefined>,
  videoRef: React.RefObject<HTMLVideoElement>,
  chatRoomId: number,
) => {
  const { users, addUser, deleteUser } = useUsersHandler();
  const { state: camState, toggleState: handleCamToggle } = useToggle(false);

  useEffect(() => {
    if (camState) {
      const clientSocket = new ClientSocket(myId);
      connection({ streamRef, videoRef, addUser, chatRoomId });
      clientSocket.socket!.on('getSenderAnswer', getSenderAnswerEvent(ClientSocket.sendPC));
      clientSocket.socket!.on('getReceiverAnswer', getReceiverAnswerEvent);
      clientSocket.socket!.on('getSenderCandidate', getSenderCandidateEvent);
      clientSocket.socket!.on('getReceiverCandidate', getReceiverCandidateEvent);
      clientSocket.socket!.on('allUsers', handleAllUserEvent(addUser, chatRoomId));
      clientSocket.socket!.on('userEnter', handleUserEnterEvent(addUser, chatRoomId));
      clientSocket.socket!.on('userExit', handleUserExitEvent(deleteUser));
    }
    return () => {
      if (camState) {
        const clientSocket = new ClientSocket(myId);
        ClientSocket.sendPC.close();
        users.forEach((user) => handleUserExitEvent(deleteUser)(user.id));
        clientSocket.socket!.emit('leaveRoom');
        clientSocket.socket!.off('getSenderAnswer', getSenderAnswerEvent(ClientSocket.sendPC));
        clientSocket.socket!.off('getReceiverAnswer', getReceiverAnswerEvent);
        clientSocket.socket!.off('getSenderCandidate', getSenderCandidateEvent);
        clientSocket.socket!.off('getReceiverCandidate', getReceiverCandidateEvent);
        clientSocket.socket!.off('allUsers', handleAllUserEvent(addUser, chatRoomId));
        clientSocket.socket!.off('userEnter', handleUserEnterEvent);
        clientSocket.socket!.off('userExit', handleUserExitEvent(deleteUser));
        muteCam(streamRef);
        // streamRef.current?.getTracks().forEach((track) => track.stop());
      }
    };
  }, [camState]);

  return { camState, handleCamToggle, users, addUser };
};

export const useWindowController = ({
  streamRef,
  videoRef,
  chatRoomId,
  addUser,
}: {
  streamRef: React.MutableRefObject<MediaStream | undefined>;
  videoRef: React.RefObject<HTMLVideoElement>;
  chatRoomId: number;
  addUser: Function;
}) => {
  const { state: windowState, toggleState: handleWindowToggle } = useToggle(false);
  useEffect(() => {
    if (windowState) {
      windowShareConnection({ streamRef, videoRef, addUser, chatRoomId });
      muteWindow(streamRef);
    }
  }, [windowState]);
  return { windowState, handleWindowToggle };
};

export const useUsersHandler = () => {
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const addUser = (userId: string, e: RTCTrackEvent) => {
    setUsers((oldUsers) =>
      oldUsers
        .filter((user) => user.id !== userId)
        .concat({
          id: userId,
          stream: e.streams[0],
        }),
    );
  };
  const deleteUser = (id: string) => setUsers((prev) => prev.filter((user) => user.id !== id));

  return { users, addUser, deleteUser };
};

export const useCamState = () => {
  const { camState, handleCamToggle } = useContext(WebRTCContext);
  return useMemo(() => ({ camState, handleCamToggle }), [camState, handleCamToggle]);
};

export const useMicState = () => {
  const { micState, handleMicToggle } = useContext(WebRTCContext);
  return useMemo(() => ({ micState, handleMicToggle }), [micState, handleMicToggle]);
};

export const useWindowState = () => {
  const { windowState, handleWindowToggle } = useContext(WebRTCContext);
  return useMemo(() => ({ windowState, handleWindowToggle }), [windowState, handleWindowToggle]);
};

export const useCamChatState = () => {
  const { users, videoRef, windowShareVideoRef } = useContext(WebRTCContext);
  return { users, videoRef, windowShareVideoRef };
};

export const useMeetingToggleState = () => {
  const { MeetingToggleButton, meetingState } = useContext(WebRTCContext);
  return { MeetingToggleButton, meetingState };
};
