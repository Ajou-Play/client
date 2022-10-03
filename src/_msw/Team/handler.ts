import { Props } from '../type';

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

export const mockGetTeam: Props = (req, res, ctx) => res(ctx.json(tempTeamList));
