import { Props } from '../type';

import { ArchiveType } from '@Component/ChannelInfoContainer/Archive/ChannelArchive.type';

const archiveList: ArchiveType[] = [
  {
    archiveId: 1,
    archiveName: '첫 문서~',
    archiveFormat: 'word',
    updatedAt: new Date(),
  },
  {
    archiveId: 2,
    archiveName: '22 문서~',
    archiveFormat: 'word',
    updatedAt: new Date(),
  },
  {
    archiveId: 3,
    archiveName: '3 문서~',
    archiveFormat: 'word',
    updatedAt: new Date(),
  },
  {
    archiveId: 4,
    archiveName: '4 문서~',
    archiveFormat: 'word',
    updatedAt: new Date(),
  },
  {
    archiveId: 5,
    archiveName: '5 문서~',
    archiveFormat: 'word',
    updatedAt: new Date(),
  },
  {
    archiveId: 6,
    archiveName: '6 문서~',
    archiveFormat: 'word',
    updatedAt: new Date(),
  },
  {
    archiveId: 7,
    archiveName: '7 문서~',
    archiveFormat: 'word',
    updatedAt: new Date(),
  },
  {
    archiveId: 8,
    archiveName: '8 문서~',
    archiveFormat: 'presentation',
    updatedAt: new Date(),
  },
];

export const mockGetArchive: Props = (req, res, ctx) => res(ctx.json(archiveList));
