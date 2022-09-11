import { setupWorker, rest } from 'msw';

import { mockTest } from './handler';

export const worker = setupWorker(rest.get('/test', mockTest));
