// /* eslint-disable dot-notation */
import React from 'react';

import type { windowType } from '@Component/.';
import { MessageWindow, TeamMemberWindow } from '@Component/.';

const windowMapTitle: any = {
  Message: { title: '채팅', element: <MessageWindow /> },
  Member: { title: '멤버', element: <TeamMemberWindow memberItems={[]} /> },
  None: {},
};

export const WindowContainer = ({
  windowSelection,
  memberItems,
  handleInit,
}: {
  windowSelection: windowType;
  memberItems: any;
  handleInit: () => void;
}) => (
  <div className='min-w-[300px] outline outline-1 outline-[#F1F1F1]'>
    <div className='h-[80px] flex flex-col justify-center p-[10px] box-border outline outline-1 outline-[#F1F1F1]'>
      <div className='flex justify-between w-full'>
        <h2 className='font-bold'>{windowMapTitle[windowSelection]?.title}</h2>
        <button
          type='button'
          onClick={handleInit}
        >
          <img
            src='/asset/Cancel.svg'
            alt='취소'
            className='w-[16px] h-[16px]'
          />
        </button>
      </div>
    </div>
    {React.cloneElement(windowMapTitle[windowSelection]?.element, {
      memberItems,
    })}
  </div>
);
