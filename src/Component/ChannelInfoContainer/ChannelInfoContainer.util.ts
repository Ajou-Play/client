import { ChannelType } from '../TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';

export const EMPTY_CHANNEL = {
  teamId: 0,
  channelId: -1,
  name: 'General',
};

type GetChannelInfo = {
  channels: ChannelType[];
  id: number;
};

type FilterChannelSameId = GetChannelInfo;

export const filterChannelSameId = ({ channels, id }: FilterChannelSameId) =>
  channels.filter(({ channelId }) => channelId === id);

export const getChannelInfo = ({ channels, id }: GetChannelInfo) => {
  const [target] = filterChannelSameId({ channels, id });
  return target ?? (EMPTY_CHANNEL as ChannelType);
};

export const getChannelIconSrc = ({ channelId }: { channelId: number }) =>
  channelId === -1 ? '/asset/BlackGeneralChannelIcon.svg' : '/asset/BlackChannelIcon.svg';
