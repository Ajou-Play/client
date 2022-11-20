import { useEffect, useRef } from 'react';

import { ChannelDetailItemType } from './SetChannelModal.type';

import { Button } from '@Component/.';
import { useModal } from '@Hook/.';

export const useSetChannelModal = (channelDetailItem: ChannelDetailItemType) => {
  const { name: originTeamName, members } = channelDetailItem;

  const channelNameRef = useRef<HTMLInputElement>(null);
  const { Modal, ModalHeader, ModalContent, handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (channelNameRef.current === null) return;
    channelNameRef.current.value = originTeamName;
  }, [channelDetailItem]);

  return {
    handleOpen,
    handleClose,
    Component: () => (
      <Modal>
        <ModalHeader
          title='채널 환경설정'
          cancel
        />
        <ModalContent>
          <div className='w-[800px] h-[540px] flex flex-col items-center p-[2rem] overflow-auto'>
            <div className='w-[100%] flex flex-col gap-[1rem] py-[1rem] border-b-[1px]'>
              <p>채널명</p>
              <div className='w-[100%] flex gap-[1rem]'>
                <input
                  className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                  ref={channelNameRef}
                />
                <Button
                  type='lightOrange'
                  content='변경'
                />
              </div>
            </div>
            <div className='w-[100%] flex flex-col gap-[1rem] py-[1rem] border-b-[1px]'>
              <p>멤버</p>
              <div className='w-[100%] flex justify-between'>
                <Button
                  type='lightOrange'
                  content='멤버 추가'
                />
                <div className='relative w-[50%]'>
                  <input className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]' />
                  <img
                    className='absolute top-[50%] right-[1rem] translate-y-[-50%]'
                    src='/asset/Search.svg'
                    alt='검색'
                  />
                </div>
              </div>
            </div>
            <div className='w-[100%] p-[1rem] grid grid-cols-2'>
              {members?.map(({ name, userId }: any) => (
                <div
                  key={userId}
                  className='flex gap-1 items-center'
                >
                  <div className='w-[2rem] h-[2rem] bg-grey-line rounded-[6px]' />
                  <div>{name}</div>
                </div>
              ))}
            </div>
          </div>
        </ModalContent>
      </Modal>
    ),
  };
};
