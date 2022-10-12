import React from 'react';

import { SMALL_ARCHIVE_FORMAT } from './SmallArchiveList.const';
import type { SmallArchiveListProps, SmallArchiveProps } from './SmallArchiveList.type';

import { useMovePage } from '@Hook/.';
import { getElementId } from '@Util/.';

export const SmallArchive = ({
  archiveId,
  archiveName,
  archiveFormat,
  updatedAt,
}: SmallArchiveProps) => {
  const src = SMALL_ARCHIVE_FORMAT[archiveFormat];
  const dummyTime = updatedAt.toString().split('T')[0];
  return (
    <div
      className='flex items-center justify-center w-[150px] h-[210px] rounded-2xl hover:bg-[#F1F1F1] cursor-pointer flex-col'
      id='archiveItem'
      data-id={archiveId}
    >
      <img
        src={src}
        alt='icon'
        className='w-[100px] h-[84px]'
      />
      <span className='text-primary-point-black text-xl mt-6 mb-3'>{archiveName}</span>
      <span className='text-grey-label text-base'>{dummyTime}</span>
    </div>
  );
};

export const SmallArchiveList = ({ archiveItems }: SmallArchiveListProps) => {
  const [moveArchive] = useMovePage();
  const handleArchiveClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = getElementId(e, '#archiveItem');
    if (!id) return;
    e.stopPropagation();
    moveArchive(`/archive/${id}`);
  };
  return (
    <div
      className='flex mt-6 w-[100%]'
      onClickCapture={handleArchiveClick}
      aria-hidden
    >
      {archiveItems.map((archive) => (
        <SmallArchive
          key={archive.archiveId}
          {...archive}
        />
      ))}
    </div>
  );
};
