import { Button } from '@Component/.';
import { useModal } from '@Hook/.';

export const useExitTeamModal = () => {
  const { Modal, ModalContent, handleOpen, handleClose } = useModal();

  return {
    handleOpen,
    handleClose,
    Component: () => (
      <Modal>
        <ModalContent>
          <div className='w-[500px] h-[300px] flex flex-col justify-center self-center text-center gap-[1rem] items-center'>
            <p>정말로 팀을 나가시겠습니까?</p>
            <Button
              type='orange'
              content='나가기'
            />
          </div>
        </ModalContent>
      </Modal>
    ),
  };
};
