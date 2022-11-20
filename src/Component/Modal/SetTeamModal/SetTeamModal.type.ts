import { MemberType, TeamType } from '@Component/TeamList/TeamList.type';

export type TeamDetailType = TeamType & {
  members: MemberType[];
};
