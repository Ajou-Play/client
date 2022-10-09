import { Props } from '../type';

type MockMemberList = {
  [key: string]: any;
};

const tempTeamList = [
  {
    teamId: 1,
    img: '/asset/1.jpeg',
    name: '제니야 ~~',
  },
  {
    teamId: 2,
    img: '/asset/2.jpeg',
    name: '금비야 ~~',
  },
  {
    teamId: 3,
    img: '/asset/3.png',
    name: '개발',
  },
];

const mockMemberList: MockMemberList = {
  '1': {
    teamId: 1,
    name: '팀 이름',
    members: [
      {
        userId: 1,
        name: '김승은',
        email: 'julie0005@ajou.ac.kr',
        profileImage: null,
        type: 'LOCAL',
      },
    ],
    profileImage: '링크',
  },
  '2': {
    teamId: 2,
    name: '팀 이름',
    members: [
      {
        userId: 1,
        name: '차재명',
        email: 'maxcha98@ajou.ac.kr',
        profileImage: null,
        type: 'LOCAL',
      },
    ],
    profileImage: '링크',
  },
  '3': {
    teamId: 3,
    name: '팀 이름',
    members: [
      {
        userId: 1,
        name: '김승은',
        email: 'julie0005@ajou.ac.kr',
        profileImage: null,
        type: 'LOCAL',
      },
    ],
    profileImage: '링크',
  },
};

export const mockGetTeam: Props = (req, res, ctx) => res(ctx.json(tempTeamList));
export const mockGetMemberByTeam: Props = (req, res, ctx) => {
  const {
    params: { teamId },
  } = req;

  return res(ctx.json(mockMemberList[teamId as string] ?? []));
};
