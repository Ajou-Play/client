import { rest } from 'msw';

import {
  mockCreateChannel,
  mockDeleteChannel,
  mockGetChannel,
  mockGetChannels,
  mockPatchChannel,
} from './handler';

export const ChannelHandler = [
  rest.post('/api/v1/channels', mockCreateChannel),
  rest.patch(`/api/v1/channels/:channelId`, mockPatchChannel),
  rest.delete(`/api/v1/channels/:channelId`, mockDeleteChannel),
  rest.get(`/api/v1/channels/:channelId`, mockGetChannel),
  rest.get(`/api/v1/teams/:teamId/channels`, mockGetChannels),
];
