import { DateTransHm } from '../MessageContent.util';

import { ProfileImage } from '@Component/ProfileImage';

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
  <div className='flex flex-col p-[1rem] gap-1'>
    <div className='flex gap-1'>
      <ProfileImage imgPath={profileImage} />
      <p>{name}</p>
    </div>
    <div className='flex items-end gap-1'>
      <div className='bg-grey-background p-[1rem] w-screen rounded-[10px]'>{content}</div>
      <p className='text-grey-label'>{DateTransHm(createAt)}</p>
    </div>
  </div>
);
