import React from 'react';

import { ARCHIVE_FORMAT, ARCHIVE_NAME } from './ChannelArchive.const';
import type {
  ArchiveListProps,
  ArchiveType,
  ChannelArchiveProps,
  CreateArchiveButtonProps,
} from './ChannelArchive.type';

import { getElementData } from '@Util/.';
import { useMovePage } from '@Hook/.';

const Archive = ({ archiveId, archiveName, archiveFormat, updatedAt }: ArchiveType) => {
  const src = ARCHIVE_FORMAT[archiveFormat];
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
  const [moveArchive] = useMovePage();
  const handleArchiveClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const id = getElementData(e, '#archiveItem');
    if (!id) return;
    e.stopPropagation();
    moveArchive(`/archive/${id}`);
  };
  return (
    <div
      className='grid grid-cols-archive-layout gap-2 h-[calc(100%-254px)] overflow-auto'
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

const FORMAT_LIST: ({
  id: number;
} & CreateArchiveButtonProps)[] = [
  {
    id: 1,
    archiveFormat: 'presentation',
  },
  {
    id: 2,
    archiveFormat: 'word',
  },
];
const CreateArchiveButton = ({ archiveFormat }: CreateArchiveButtonProps) => {
  const src = ARCHIVE_FORMAT[archiveFormat];
  const name = ARCHIVE_NAME[archiveFormat];
  return (
    <div className='flex bg-[#FCFCFC] w-[362px] h-[100px] px-[36px] py-[24px] box-border rounded-lg mr-4 mt-6 mb-8 items-center justify-between cursor-pointer'>
      <div className='flex items-center'>
        <img
          src={src}
          alt='문서 아이콘'
          width='24px'
          height='24px'
        />
        <span className='ml-2'>{name}</span>
      </div>
      <div>
        <img
          src='/asset/plusIcon.svg'
          alt='문서 만들기 버튼'
          width='24px'
          height='24px'
        />
      </div>
    </div>
  );
};
export const ChannelArchive = ({ archiveItems }: ChannelArchiveProps) => {
  console.log('1');
  return (
    <>
      <div className='text-[#403F40] font-extrabold'>새 파일 만들기</div>
      <div className='flex'>
        {FORMAT_LIST.map(({ id, archiveFormat }) => (
          <CreateArchiveButton
            key={id}
            archiveFormat={archiveFormat}
          />
        ))}
      </div>
      <div className='text-[#403F40] font-extrabold'>최근문서</div>
      <ArchiveList archiveItems={archiveItems} />
    </>
  );
};
