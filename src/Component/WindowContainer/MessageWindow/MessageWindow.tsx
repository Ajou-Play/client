import { useContext } from 'react';

import { useGetMessageHistory } from './MessageWindow.hook';
import { compareSenderReceiverType } from './MessageWindow.util';

import { MessageContent } from '@Component/.';
import { TeamContext } from '@Context/.';
import { registerChatSocketEvent } from '@Socket/.';
import { useChat } from '@Socket/Chat/useChat';
import { getStorageItem } from '@Util/storage';

export const MessageWindow = () => {
  const teamSelect = useContext(TeamContext);
  const messageHistory = useGetMessageHistory(teamSelect);
  const { sendMessage, error, messageData } = useChat(teamSelect);
  // const { messageData, error } = registerChatSocketEvent(teamSelect);

  const userId = getStorageItem('userId');

  const handleSendMessage = (event: any) => {
    if (event.code === 'Enter' && !error) {
      sendMessage({
        type: 'TALK',
        channelId: Number(teamSelect),
        senderId: Number(userId),
        content: event.target.value,
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
            {messageHistory.map(({ sender, content, createdAt }) => (
              <MessageContent
                key={content + createdAt}
                type={compareSenderReceiverType(sender.senderId === Number(userId))}
                name={sender.name}
                content={content}
                createAt={createdAt}
                profileImage={sender.profileImage}
              />
            ))}
            {messageData.map(({ sender, content, createdAt }) => (
              <MessageContent
                key={content + createdAt}
                type={compareSenderReceiverType(sender.senderId === Number(userId))}
                name={sender.name}
                content={content}
                createAt={createdAt}
                profileImage={sender.profileImage}
              />
            ))}
          </div>
        )}
      </div>
      <div className='flex justify-center items-center h-[90px] w-[100%] outline outline-1 outline-[#F1F1F1]'>
        <div className='relative w-[260px] h-[44px]'>
          <input
            className='rounded bg-grey-background  placeholder:text-center w-[100%] h-[100%]'
            placeholder='내용을 입력해주세요...'
            onKeyUp={handleSendMessage}
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
