import { rest } from 'msw';

import { mockGetTeam } from './handler';

export const TeamHandler = [rest.get('/api/v1/teams', mockGetTeam)];
