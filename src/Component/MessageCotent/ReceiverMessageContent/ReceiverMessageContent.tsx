import { DateTransHm } from '../MessageContent.util';

export const ReceiverMessageContent = ({
  name,
  profileImage,
  content,
  createAt,
}: {
  name: string;
  content: string;
  profileImage: string;
  createAt: Date;
}) => (
  <div>
    <div>
      <img
        src={profileImage}
        alt='아이콘'
      />
      <p>{name}</p>
    </div>
    <div className=''>{content}</div>
    <p>{DateTransHm(createAt)}</p>
  </div>
);
