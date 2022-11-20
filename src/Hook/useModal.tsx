import { cloneElement, ReactNode, useState } from 'react';

import Portal from '../portal';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const ModalHeader = ({ title, cancel }: { title: string; cancel?: boolean }) => (
    <div className='flex justify-between p-[1rem] border-b-[1px] border-grey-line '>
      <h3 className=' text-lg font-bold'>{title}</h3>
      {cancel && (
        <button
          type='button'
          onClick={handleClose}
        >
          <img
            width='15px'
            height='15px'
            src='/asset/Cancel.svg'
            alt='취소'
          />
        </button>
      )}
    </div>
  );

  const ModalContent = ({ children }: { children: ReactNode }) => (
    <div className='p-[1rem]'>{children}</div>
  );

  const ModalFooter = ({ buttons }: { buttons: any[] }) => (
    <div className='p-[1rem] border-t-[1px] border-grey-line flex flex-row-reverse gap-[1rem]'>
      {buttons.map((button) => cloneElement(button))}
    </div>
  );

  const Modal = ({ children, cancel }: { children: ReactNode; cancel?: boolean }) => (
    <Portal>
      {isOpen && (
        <>
          <div className='fixed bg-[#1e222250] w-screen h-screen z-[998] top-0 left-0' />
          <div className='fixed flex z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-[10px] flex-col'>
            {children}
            {cancel && (
              <button
                type='button'
                className='absolute top-[1rem] right-[1rem]'
                onClick={handleClose}
              >
                <img
                  width='15px'
                  height='15px'
                  src='/asset/Cancel.svg'
                  alt='취소'
                />
              </button>
            )}
          </div>
        </>
      )}
    </Portal>
  );

  return {
    handleClose,
    handleOpen,
    Modal,
    ModalHeader,
    ModalContent,
    ModalFooter,
    isOpen,
  };
};
