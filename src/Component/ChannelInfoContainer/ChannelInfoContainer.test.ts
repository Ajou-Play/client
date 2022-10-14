import { expect, describe, it } from '@jest/globals';

import { ChannelType } from '../TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';
import {
  EMPTY_CHANNEL,
  filterChannelSameId,
  getChannelIconSrc,
  getChannelInfo,
} from './ChannelInfoContainer.util';

const TEMP_ARR: ChannelType[] = [
  {
    teamId: 1,
    channelId: 1,
    name: 'hi',
  },
  {
    teamId: 1,
    channelId: 2,
    name: 'hi',
  },
  {
    teamId: 1,
    channelId: 3,
    name: 'hi',
  },
  {
    teamId: 1,
    channelId: 4,
    name: 'hi',
  },
];
const TEMP_ID = 3;
const DONT_EXIST_ID = 10;
const GENERAL_CHANNEL_ID = -1;

describe('filterChannelSameId Func Unit Test', () => {
  it('exist channel same id', () => {
    const result = filterChannelSameId({ channels: TEMP_ARR, id: TEMP_ID });
    const expectResult = [
      {
        teamId: 1,
        channelId: 3,
        name: 'hi',
      },
    ];
    expect(result).toEqual(expectResult);
  });

  it('dont exist channel same id', () => {
    const result = filterChannelSameId({ channels: TEMP_ARR, id: DONT_EXIST_ID });
    const expectResult: ChannelType[] = [];
    expect(result).toEqual(expectResult);
  });
});

describe('getChannelInfo Func Unit Test', () => {
  it('get success by exist channel info', () => {
    const result = getChannelInfo({ channels: TEMP_ARR, id: TEMP_ID });
    const expectResult = {
      teamId: 1,
      channelId: 3,
      name: 'hi',
    };
    expect(result).toEqual(expectResult);
  });

  it('get fail by dont exist channel info', () => {
    const result = getChannelInfo({ channels: TEMP_ARR, id: DONT_EXIST_ID });
    const expectResult = EMPTY_CHANNEL;
    expect(result).toEqual(expectResult);
  });
});

describe('getChannelIconSrc Func Unit Test', () => {
  it('getChannelIconSrc by general data', () => {
    const result = getChannelIconSrc({ channelId: GENERAL_CHANNEL_ID });
    const expectResult = '/asset/BlackGeneralChannelIcon.svg';
    expect(result).toBe(expectResult);
  });

  it('getChannelIconSrc by Channel Data', () => {
    const result = getChannelIconSrc({ channelId: TEMP_ID });
    const expectResult = '/asset/BlackChannelIcon.svg';
    expect(result).toBe(expectResult);
  });
});
