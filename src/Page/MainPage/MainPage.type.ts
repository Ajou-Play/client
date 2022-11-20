import { TeamType } from '@Component/TeamList/TeamList.type';

export type UseTeamListResult = {
  teamList: TeamType[];
  handleAddTeam: ({ teamId, profileImage, name }: TeamType) => void;
  handleDeleteTeam: (e: any) => void;
};
export type UseTeamList = () => UseTeamListResult;

export type UseTeamSelect = {
  teamSelect: number;
  handleChangeTeamSelect: (e: any) => void;
};
export type UseChannelSelect = {
  channelSelect: number;
  handleChangeChannelSelect: (e: any) => void;
};

export type MainPageBody = 'Home' | 'Archive';
