import { SenderMessageContent, ReceiverMessageContent } from '@Component/.';

export const MessageContent = ({
  type,
  name,
  profileImage,
  content,
  createAt,
}: {
  type: 'sender' | 'receiver';
  name: string;
  content: string;
  createAt: number;
  profileImage: string;
}) => (
  <>
    {type === 'sender' && (
      <SenderMessageContent
        content={content}
        createAt={createAt}
      />
    )}
    {type === 'receiver' && (
      <ReceiverMessageContent
        name={name}
        content={content}
        createAt={createAt}
        profileImage={profileImage}
      />
    )}
  </>
);
