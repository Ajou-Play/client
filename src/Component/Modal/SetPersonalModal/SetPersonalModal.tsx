import { useEffect, useRef } from 'react';

import { useGetMyInfo } from './SetPersonalModal.hook';

import { Button } from '@Component/.';
import { useModal } from '@Hook/.';

export const useSetPersonalModal = () => {
  const myInfo = useGetMyInfo(1);
  const nameRef = useRef<HTMLInputElement>(null);
  const { isOpen, Modal, ModalHeader, ModalContent, handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (nameRef.current === null) return;
    nameRef.current.value = myInfo.name;
  }, [myInfo, isOpen]);

  return {
    handleOpen,
    handleClose,
    Component: () => (
      <Modal>
        <ModalHeader
          title='개인 환경설정'
          cancel
        />
        <ModalContent>
          <div className='w-[800px] h-[540px] flex flex-col items-center p-[2rem] overflow-auto'>
            <div className='w-[100%] flex flex-col gap-[1rem] py-[1rem] border-b-[1px]'>
              <p>팀 프로필 이미지</p>
              <img
                id='TeamItem'
                src={myInfo.profileImage}
                className='w-[100px] h-[100px] bg-grey-line rounded-[20px]'
                alt='팀'
              />
              <div className='w-[100%] flex gap-[1rem]'>
                <Button
                  type='lightOrange'
                  content='변경'
                />
                <Button
                  type='lightOrange'
                  content='삭제'
                />
              </div>
            </div>
            <div className='w-[100%] flex flex-col gap-[1rem] py-[1rem] border-b-[1px]'>
              <p>닉네임</p>
              <div className='w-[100%] flex gap-[1rem]'>
                <input
                  className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                  placeholder='사용자 이메일 혹은 이름을 입력해주세요'
                  ref={nameRef}
                />
                <Button
                  type='lightOrange'
                  content='변경'
                />
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    ),
  };
};
