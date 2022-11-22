import { Props } from '../type';

export const MSW_CHAT_DATA = [
  {
    messageId: 1,
    sender: {
      userId: 2,
      name: '김승은',
      email: 'julie0005@ajou.ac.kr',
      profileImage: '프로필 이미지 스토리지 링크',
    },
    content: 'message 내용',
    createdAt: '2022-01-20 17:35:23',
    type: '메세지 타입',
  },
];

export const mockGetChatData: Props = (req, res, ctx) => res(ctx.json(MSW_CHAT_DATA));
