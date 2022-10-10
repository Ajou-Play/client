import { rest } from 'msw';

import { mockGetArchive } from './handler';

export const ArchiveHandler = [rest.get('/api/v1/archives', mockGetArchive)];
