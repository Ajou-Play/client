import { useContext } from 'react';
import Switch from 'react-switch';

import { WebRTCContext } from './WebRTC.provider';

import { useToggle } from '@Hook/.';

export const useMeetingController = () => {
  const { state: meetingState, toggleState } = useToggle();

  const MeetingToggleButton = () => (
    <Switch
      height={40}
      width={75}
      className='mettingToggleButton'
      checked={meetingState}
      onChange={toggleState}
      uncheckedIcon={false}
      checkedIcon={false}
      uncheckedHandleIcon={
        <img
          src='/asset/Meeting/meetingOff.svg'
          width={38}
          alt='미팅off'
        />
      }
      checkedHandleIcon={
        <img
          src='/asset/Meeting/meetingOn.svg'
          width={38}
          alt='미팅on'
        />
      }
      onColor='#FF6C47'
      offColor='#FFE4D8'
    />
  );

  return {
    state: meetingState,
    component: MeetingToggleButton,
  };
};
export const useMeetingToggleState = () => {
  const { MeetingToggleButton, meetingState } = useContext(WebRTCContext);
  return { MeetingToggleButton, meetingState };
};

export const useCheckCamChat = () => {
  const { meetingState } = useContext(WebRTCContext);
  return meetingState;
};
