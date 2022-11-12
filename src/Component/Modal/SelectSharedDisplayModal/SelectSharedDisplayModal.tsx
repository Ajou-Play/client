import { Button } from '@Component/.';
import { useModal } from '@Hook/.';

const SharedDisplayitem = ({ displayTitle }: { displayTitle: string }) => (
  <button
    type='button'
    className='flex flex-col text-center items-center'
    onClick={() => {}}
  >
    <div className='w-[200px] h-[100px] bg-grey-line' />
    <p>{displayTitle}</p>
  </button>
);

export const useSelectSharedDisplayModal = () => {
  const { Modal, ModalHeader, ModalContent, ModalFooter, handleOpen, handleClose } = useModal();

  return {
    handleOpen,
    handleClose,
    Component: () => (
      <Modal>
        <ModalHeader
          cancel
          title='공유하려는 창 선택'
        />
        <ModalContent>
          <div className='w-[700px] h-[200px] grid gap-[2rem] grid-cols-3 overflow-auto p-[1rem] items-center self-center'>
            {Array(10)
              .fill('')
              .map((v) => (
                <SharedDisplayitem
                  displayTitle='dd'
                  key={v}
                />
              ))}
          </div>
        </ModalContent>
        <ModalFooter
          buttons={[
            <Button
              key='1'
              type='orange'
              content='공유'
              onClick={() => {}}
            />,
          ]}
        />
      </Modal>
    ),
  };
};
