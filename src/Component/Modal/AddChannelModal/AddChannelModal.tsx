import { useState } from 'react';
import Switch from 'react-switch';

import { Button } from '@Component/.';
import { useModal } from '@Hook/.';

export const useAddChannelModal = () => {
  const { Modal, ModalContent, ModalFooter, handleOpen, handleClose } = useModal();

  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (flag: boolean) => setChecked(flag);

  return {
    handleOpen,
    handleClose,
    Component: () => (
      <Modal cancel>
        <ModalContent>
          <div className='w-[800px] h-[540px] flex flex-col gap-[4rem] items-center p-[2rem]'>
            <h2 className='text-[1.4rem] font-bold'>채널 생성</h2>
            <div className='w-[100%] flex flex-col gap-[2rem]'>
              <div className='w-[100%] flex flex-col gap-[1rem]'>
                <p>채널 이름 *</p>
                <input className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]' />
                <p>예) 프론트/디자이너</p>
              </div>
              <div className='w-[100%] flex flex-col gap-[1rem]'>
                <p>채널 설명</p>
                <input
                  className='w-[100%] h-[3rem] bg-grey-background rounded-[6px] focus:outline-none p-[10px]'
                  required
                />
                <p>무엇에 대한 채널인가요?</p>
              </div>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-bold'>비공개로 만들기</p>
                  <p>채널이 비공개로 설정된 경우 초대를 통해서만 참여할 수 있습니다.</p>
                </div>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor='#FF6C47'
                />
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter
          buttons={[
            <Button
              key='1'
              type='orange'
              content='생성'
              onClick={() => {}}
            />,
          ]}
        />
      </Modal>
    ),
  };
};
