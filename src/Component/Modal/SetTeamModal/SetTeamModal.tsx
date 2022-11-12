import { useEffect, useRef } from 'react';

import { TeamDetailType } from './SetTeamModal.type';

import { Button } from '@Component/.';
import { useModal } from '@Hook/.';

export const useSetTeamModal = (teamDetailItem: TeamDetailType) => {
  const { name: originTeamName, members, profileImage } = teamDetailItem;

  const teamNameRef = useRef<HTMLInputElement>(null);
  const { Modal, ModalHeader, ModalContent, handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (teamNameRef.current === null) return;
    teamNameRef.current.value = originTeamName;
  }, [teamDetailItem]);

  return {
    handleOpen,
    handleClose,
    Component: () => (
      <Modal>
        <ModalHeader
          title='팀 환경설정'
          cancel
        />
        <ModalContent>
          <div className='w-[800px] h-[540px] flex flex-col items-center p-[2rem] overflow-auto'>
            <div className='w-[100%] flex flex-col gap-[1rem] py-[1rem] border-b-[1px]'>
              <p>팀 프로필 이미지</p>
              <img
                id='TeamItem'
                src={profileImage}
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
              <p>팀 명</p>
              <div className='w-[100%] flex gap-[1rem]'>
                <input
                  className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                  placeholder='사용자 이메일 혹은 이름을 입력해주세요'
                  ref={teamNameRef}
                />
                <Button
                  type='lightOrange'
                  content='변경'
                />
              </div>
            </div>
            <div className='w-[100%] flex flex-col gap-[1rem] py-[1rem] border-b-[1px]'>
              <p>초대 링크</p>
              <div className='w-[100%] flex gap-[1rem]'>
                <input
                  className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                  placeholder='사용자 이메일 혹은 이름을 입력해주세요'
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
                  <input
                    className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                    placeholder='사용자 이메일 혹은 이름을 입력해주세요'
                  />
                  <img
                    className='absolute top-[50%] right-[1rem] translate-y-[-50%]'
                    src='/asset/Search.svg'
                    alt='검색'
                  />
                </div>
              </div>
            </div>
            <div className='w-[100%] p-[1rem] grid grid-cols-2'>
              {members?.map(({ name, userId }) => (
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
