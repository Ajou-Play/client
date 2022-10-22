import { Props } from '../type';

type MockChannelList = {
  [key: string]: any[];
};
export const MSW_CHANNEL_LIST: MockChannelList = {
  '1': [
    {
      teamId: 1,
      channelId: 1,
      name: '1채널 이름',
    },
    {
      teamId: 1,
      channelId: 2,
      name: '2채널 이름',
    },
    {
      teamId: 1,
      channelId: 3,
      name: '3채널 이름',
    },
  ],
  '2': [
    {
      teamId: 2,
      channelId: 1,
      name: '4채널 이름',
    },
    {
      teamId: 2,
      channelId: 2,
      name: '5채널 이름',
    },
    {
      teamId: 2,
      channelId: 3,
      name: '6채널 이름',
    },
  ],
  '3': [
    {
      teamId: 3,
      channelId: 1,
      name: '7채널 이름',
    },
    {
      teamId: 3,
      channelId: 2,
      name: '8채널 이름',
    },
    {
      teamId: 3,
      channelId: 3,
      name: '9채널 이름',
    },
  ],
};

export const mockCreateChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockPatchChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockDeleteChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetChannels: Props = (req, res, ctx) => {
  const {
    params: { teamId },
  } = req;
  return res(ctx.json(MSW_CHANNEL_LIST[teamId as string] ?? []));
};
