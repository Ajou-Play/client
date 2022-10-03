import { UseChannelSelect } from '@Page/MainPage/MainPage.type';

export type ChannelType = {
  teamId: number;
  channelId: number;
  name: string;
};

export type BasicTeamInfoProps = {
  ChannelList: ChannelType[];
} & Pick<UseChannelSelect, 'channelSelect' | 'handleChangeChannelSelect'>;
