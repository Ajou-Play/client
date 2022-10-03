import { UseTeamSelect } from '@Page/MainPage/MainPage.type';

export type TeamType = {
  img: string;
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
  handleModalOpen: () => void;
} & Pick<UseTeamSelect, 'teamSelect' | 'handleChangeTeamSelect'>;
