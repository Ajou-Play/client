import { useContext } from 'react';

import { ReceiverMessageContent, SenderMessageContent } from '@/Component/MessageCotent';
import { TeamContext } from '@/Context';
import { registerChatSocketEvent } from '@/Socket';
import { sendMessage } from '@/Socket/Chat';

export const MessageWindow = () => {
  const teamSelect = useContext(TeamContext);
  const { messageData, error } = registerChatSocketEvent(teamSelect);
  const userId = 1; // 임시 데이터 입니다.

  const handleSendMessage = (event: any) => {
    if (event.code === 'Enter' && !error) {
      sendMessage({
        userId: '1',
        message: JSON.stringify({
          channelId: teamSelect,
          senderId: 1,
          content: event.target.value,
          createAt: new Date(),
        }),
      });
      event.target.value = '';
    }
  };

  return (
    <>
      <div className='min-h-[calc(100vh_-_170px)]'>
        {error && <p>네트워크가 원활하지 않습니다.</p>}
        {!error && (
          <div>
            {messageData.map(({ sender, content, createAt }) =>
              sender.senderId === userId ? (
                <SenderMessageContent
                  content={content}
                  createAt={createAt}
                />
              ) : (
                <ReceiverMessageContent
                  name={sender.name}
                  profileImage={sender.profileImage}
                  content={content}
                  createAt={createAt}
                />
              ),
            )}
          </div>
        )}
      </div>
      <div className='flex justify-center items-center h-[90px] w-[100%] outline outline-1 outline-[#F1F1F1]'>
        <div className='relative w-[260px] h-[44px]'>
          <input
            className='rounded bg-grey-background  placeholder:text-center w-[100%] h-[100%]'
            placeholder='내용을 입력해주세요...'
            onKeyDown={handleSendMessage}
          />
          <img
            className='w-[24px] h-[24px] absolute right-[1rem] top-[50%] translate-y-[-50%] cursor-pointer'
            src='/asset/Cursor.svg'
            alt='cursor'
          />
        </div>
      </div>
    </>
  );
};
