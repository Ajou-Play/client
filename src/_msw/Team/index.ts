import { rest } from 'msw';

import { mockGetTeam, mockGetMemberByTeam } from './handler';

export const TeamHandler = [
  rest.get('/api/v1/teams', mockGetTeam),
  rest.get('/api/v1/teams/:teamId', mockGetMemberByTeam),
];
