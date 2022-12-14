type ArchiveFormat = 'word' | 'presentation';
export type ArchiveType = {
  archiveId: number;
  archiveName: string;
  archiveFormat: ArchiveFormat;
  updatedAt: Date;
  createdAt: Date;
};

export type ArchiveListProps = {
  archiveItems: ArchiveType[];
};

export type ChannelArchiveProps = ArchiveListProps;

export type CreateArchiveButtonProps = {
  archiveFormat: ArchiveFormat;
};
