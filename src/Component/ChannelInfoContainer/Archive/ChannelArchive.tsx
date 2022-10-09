import React from 'react';

import type { ArchiveListProps, ArchiveType } from './ChannelArchive.type';

import { getElementId } from '@/Util';
import { useMovePage } from '@Hook/.';

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

const Archive = ({ archiveId, archiveName, archiveFormat, updatedAt }: ArchiveType) => {
  const src = archiveFormat === 'word' ? '/asset/wordFormat.svg' : '/asset/presentationFormat.svg';
  return (
    <div
      className='w-[362px] h-[344px] rounded-tl-lg rounded-tr-lg mt-[20px] cursor-pointer'
      data-id={archiveId}
      id='archiveItem'
    >
      <div className='cursor-pointer'>
        <iframe
          src={String(archiveId)}
          title='archive'
          className='w-[100%] h-[224px] bg-[#D7D7D7] rounded-tl-lg rounded-tr-lg'
        />
      </div>
      <div className='bg-[#FCFCFC] rounded-br-lg rounded-bl-lg py-[36px] px-[24px] box-border flex items-center'>
        <span>
          <img
            src={src}
            alt='문서 아이콘'
            width='32px'
            height='32px'
          />
        </span>
        <span className='flex flex-col ml-[20px] h-[47px]'>
          <p>{archiveName}</p>
          <p className='text-[#888888] text-[14px]'>{updatedAt.toString()}</p>
        </span>
      </div>
    </div>
  );
};

const ArchiveList = ({ archiveItems }: ArchiveListProps) => {
  const moveArchive = useMovePage() as Function;
  const handleArchiveClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = getElementId(e, '#archiveItem');
    if (!id) return;
    e.preventDefault();
    e.stopPropagation();
    moveArchive(`/archive/${id}`);
  };
  return (
    <div
      className='flex flex-wrap justify-around items-stretch'
      onClickCapture={handleArchiveClick}
      aria-hidden
    >
      {archiveItems.map((archive) => (
        <Archive
          key={archive.archiveId}
          {...archive}
        />
      ))}
    </div>
  );
};
export const ChannelArchive = () => {
  console.log('1');
  return (
    <div className='px-[48px] py-[50px] box-border'>
      <div>새 파일 만들기</div>
      <div>최근문서</div>
      <ArchiveList archiveItems={archiveList} />
    </div>
  );
};
