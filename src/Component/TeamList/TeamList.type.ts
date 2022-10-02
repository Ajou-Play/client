import { UseTeamSelect } from '@Page/MainPage/MainPage.type';

export type TeamType = {
  img: string;
  teamId: number;
  name: string;
};
export type TempList = TeamType[];

export type TeamItemProps = {
  select: boolean;
  img: string;
  idx: number;
};

export type TeamAddItemProps = {
  onClick: () => void;
};

export type TeamListProps = {
  list: TempList;
  teamSelect: UseTeamSelect[0];
  handleChangeTeamSelect: UseTeamSelect[1];
  handleModalOpen: () => void;
};
