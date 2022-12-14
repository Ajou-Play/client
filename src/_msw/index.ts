import { setupWorker } from 'msw';

import { ArchiveHandler } from './Archive';
import { ChannelHandler } from './Channel';
import { DocsHandler } from './Docs';
import { TeamHandler } from './Team';
import { UserHandler } from './User';

export const worker = setupWorker(
  ...TeamHandler,
  ...ChannelHandler,
  ...DocsHandler,
  ...UserHandler,
  ...ArchiveHandler,
);
