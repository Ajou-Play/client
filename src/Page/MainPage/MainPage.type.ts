import { TeamType, TempList } from '@Component/TeamList/TeamList.type';

export type UseTeamListResult = [
  TempList,
  ({ teamId, img, name }: TeamType) => void,
  (e: any) => void,
];
export type UseTeamList = () => UseTeamListResult;
export type UseTeamSelect = [number, (e: any) => void];
export type UseChannelSelect = [number, (e: any) => void];
