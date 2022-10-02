import { UseTeamListResult } from '@Page/MainPage/MainPage.type';

export type TeamCreateModalProps = {
  handleAddTeam: UseTeamListResult[1];
  handleModalClose: () => void;
};
