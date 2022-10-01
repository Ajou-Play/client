import { rest } from 'msw';

import { mockCreateDocs, mockDeleteDocs } from './handler';

export const DocsHandler = [
  rest.post('/api/v1/docs', mockCreateDocs),
  rest.delete('/api/v1/docs/:documentId', mockDeleteDocs),
];
