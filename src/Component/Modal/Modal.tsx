import { cloneElement, ReactNode } from 'react';

import Portal from '@/portal';

export const ModalHeader = ({ title, isCancel }: { title: string; isCancel?: boolean }) => (
  <div className='flex justify-between p-[1rem] border-b-[1px] border-grey-line '>
    <h3 className=' text-lg font-bold'>{title}</h3>
    {isCancel && (
      <button type='button'>
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

export const ModalContent = ({ children }: { children: ReactNode }) => (
  <div className='p-[1rem]'>{children}</div>
);

export const ModalFooter = ({ buttons }: { buttons: any[] }) => (
  <div
    className={`p-[1rem] border-t-[1px] border-grey-line flex justify-between ${
      buttons.length > 1 ? '' : ' flex-row-reverse'
    }`}
  >
    {buttons.map((button) => cloneElement(button))}
  </div>
);

export const Modal = ({ children, isCancel }: { children: ReactNode; isCancel?: boolean }) => (
  <Portal>
    <div className='fixed bg-[#1e222250] w-screen h-screen z-[998] top-0 left-0' />
    <div className='fixed flex z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-[10px] flex-col'>
      {children}
      {isCancel && (
        <button
          type='button'
          className='absolute top-[1rem] right-[1rem]'
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
  </Portal>
);
