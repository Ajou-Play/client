type ArchiveFormat = 'word' | 'presentation';
export type ArchiveType = {
  archiveId: number;
  archiveName: string;
  archiveFormat: ArchiveFormat;
  updatedAt: Date;
};

export type ArchiveListProps = {
  archiveItems: ArchiveType[];
};
