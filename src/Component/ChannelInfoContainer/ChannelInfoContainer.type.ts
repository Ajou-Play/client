import React from 'react';

import { ChannelType } from '../TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';

export type ChannelInfoContainerType = {
  children: React.ReactNode;
} & Pick<ChannelType, 'channelId' | 'name'>;
