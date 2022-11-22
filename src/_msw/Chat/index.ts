import { rest } from 'msw';

import { mockGetChatData } from './handler';

export const ArchiveHandler = [
  rest.get('/api/v1/channels/:channelId/chats?page=0&size=500', mockGetChatData),
];
