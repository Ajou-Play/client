import { motion } from 'framer-motion';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { WebRTCPC } from '../../Socket';
import webRTCInitSocket from '../../Socket/WebRTC/webRTCInitSocket';
import { WebRTCContext } from './WebRTC.provider';
import { WebRTCUser } from './WebRTC.type';
import { connection, muteCam, muteMic, muteWindow, windowShareConnection } from './WebRTC.util';

import { useToggle } from '@Hook/.';

const nickName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const myId = nickName[Math.floor(Math.random() * nickName.length)];

const getUrlByMeetingState = (flag: boolean) => (flag ? 'Meeting/meetingOn' : 'Meeting/meetingOff');
export const useMeetingController = (
  cb: Function,
  addUser: Function,
  deleteUser: Function,
  userId: number,
  chatRoomId: string,
) => {
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
    if (!meetingState) cb();
    webRTCInitSocket(meetingState, addUser, deleteUser, userId, chatRoomId);
  }, [meetingState]);

  return {
    state: meetingState,
    component: MeetingToggleButton,
  };
};

export const useMicController = (ref: React.MutableRefObject<MediaStream | undefined>) => {
  const {
    state: micState,
    toggleState: handleMicToggle,
    falseState: handleMicFalse,
  } = useToggle(false);
  useEffect(() => {
    muteMic(ref);
  }, [micState]);
  return { micState, handleMicToggle, handleMicFalse };
};

export const useCamController = (
  streamRef: React.MutableRefObject<MediaStream | undefined>,
  videoRef: React.RefObject<HTMLVideoElement>,
  chatRoomId: string,
  userId: number,
) => {
  const { users, addUser, deleteUser } = useUsersHandler();
  const {
    state: camState,
    toggleState: handleCamToggle,
    falseState: handleCamFalse,
  } = useToggle(false);

  useEffect(() => {
    if (camState) connection({ streamRef, videoRef, addUser, chatRoomId, userId });
    else WebRTCPC.sendPC?.close();
  }, [camState]);
  return { camState, handleCamToggle, users, addUser, handleCamFalse, deleteUser };
};

export const useWindowController = ({
  streamRef,
  videoRef,
  chatRoomId,
  addUser,
}: {
  streamRef: React.MutableRefObject<MediaStream | undefined>;
  videoRef: React.RefObject<HTMLVideoElement>;
  chatRoomId: string;
  addUser: Function;
}) => {
  const {
    state: windowState,
    toggleState: handleWindowToggle,
    falseState: handleWindowFalse,
  } = useToggle(false);
  useEffect(() => {
    if (windowState) {
      windowShareConnection({ streamRef, videoRef, addUser, chatRoomId, userId: 0 });
      muteWindow(streamRef);
    }
  }, [windowState]);
  return { windowState, handleWindowToggle, handleWindowFalse };
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

export const useCheckCamChat = () => {
  const { users, camState, windowState } = useContext(WebRTCContext);
  return !!users.length || camState || windowState;
};

export const useCamUsers = () => {
  const { users } = useContext(WebRTCContext);
  return users;
};
