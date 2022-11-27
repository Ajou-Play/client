import { DateTransHm } from '../MessageContent.util';

export const SenderMessageContent = ({
  content,
  createAt,
}: {
  content: string;
  createAt: number;
}) => (
  <div className='flex items-end gap-1 p-[1rem]'>
    <p className='text-grey-label'>{DateTransHm(createAt)}</p>
    <div className='bg-[linear-gradient(180deg,#FF6C47_0%,#FFA06A_100%)] p-[1rem] w-screen rounded-[10px] text-grey-offWhite'>
      {content}
    </div>
  </div>
);
