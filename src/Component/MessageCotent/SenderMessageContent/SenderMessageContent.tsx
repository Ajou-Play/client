import { DateTransHm } from '../MessageContent.util';

export const SenderMessageContent = ({
  content,
  createAt,
}: {
  content: string;
  createAt: Date;
}) => (
  <div>
    <p>{DateTransHm(createAt)}</p>
    <div className=''>{content}</div>
  </div>
);
