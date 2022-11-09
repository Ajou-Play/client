import { ChannelType } from './BasicTeamInfo/BasicTeamInfo.type';

export type TeamInfoContainerProps = {
  channelList: ChannelType[];
  channelSelect: number;
  handleChangeChannelSelect: (e: any) => void;
  teamName: string;
};
