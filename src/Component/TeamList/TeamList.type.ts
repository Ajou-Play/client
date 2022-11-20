import { UseTeamSelect } from '@Page/MainPage/MainPage.type';

export type MemberType = {
  userId: number;
  name: string;
  email: string;
  profileImage: string;
  type: 'LOCAL' | 'OAUTH';
};

export type TeamType = {
  profileImage: string;
  teamId: number;
  name: string;
};

export type TeamItemProps = {
  select: boolean;
  img: string;
  idx: number;
};

export type TeamAddItemProps = {
  onClick: () => void;
};

export type TeamListProps = {
  list: TeamType[];
} & Pick<UseTeamSelect, 'teamSelect' | 'handleChangeTeamSelect'>;
