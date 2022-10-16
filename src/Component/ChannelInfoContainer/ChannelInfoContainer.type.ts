import React from 'react';

import { ChannelType } from '../TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';

import type { windowType } from '@Component/.';

export type ChannelInfoContainerType = {
  children: React.ReactNode;
  handleArchiveButtonClick: () => void;
  handleClick: (selectState: windowType) => void;
} & Pick<ChannelType, 'channelId' | 'name'>;
