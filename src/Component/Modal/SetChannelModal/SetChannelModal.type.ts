import { MemberType, TeamType } from '@Component/TeamList/TeamList.type';

export type ChannelDetailItemType = TeamType & {
  members: MemberType[];
};
