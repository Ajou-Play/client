import React from 'react';

import { ChannelType } from '../TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';

import type { windowType } from '@Component/.';

export type ChannelInfoContainerType = {
  children: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  handleClick: (selectState: windowType) => void;
} & Pick<ChannelType, 'channelId' | 'name'>;
