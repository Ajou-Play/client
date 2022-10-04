import { UseTeamListResult } from '@Page/MainPage/MainPage.type';

export type TeamCreateModalProps = {
  handleModalClose: () => void;
} & Pick<UseTeamListResult, 'handleAddTeam'>;
