import React from 'react';

import type { ArchiveListProps, ArchiveType, ChannelArchiveProps } from './ChannelArchive.type';

import { getElementId } from '@/Util';
import { useMovePage } from '@Hook/.';

const Archive = ({ archiveId, archiveName, archiveFormat, updatedAt }: ArchiveType) => {
  const src = archiveFormat === 'word' ? '/asset/wordFormat.svg' : '/asset/presentationFormat.svg';
  return (
    <div
      className='w-[362px] h-[344px] rounded-tl-lg rounded-tr-lg mt-[20px] cursor-pointer'
      data-id={archiveId}
      id='archiveItem'
    >
      <div className='w-[100%] h-[224px] bg-[#D7D7D7] rounded-tl-lg rounded-tr-lg cursor-pointer relative'>
        <iframe
          src={String(archiveId)}
          title='archive'
          className='w-[100%] h-[100%]'
        />
        <div className='w-[100%] h-[100%] absolute inset-0' />
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

export const ArchiveList = ({ archiveItems }: ArchiveListProps) => {
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
export const ChannelArchive = ({ archiveItems }: ChannelArchiveProps) => {
  console.log('1');
  return (
    <div className='px-[48px] py-[50px] box-border'>
      <div>새 파일 만들기</div>
      <div>최근문서</div>
      <ArchiveList archiveItems={archiveItems} />
    </div>
  );
};
