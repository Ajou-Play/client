import { ChannelType } from '../TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';

type GetChannelInfo = {
  channels: ChannelType[];
  id: number;
};
type FilterChannelSameId = GetChannelInfo;

const filterChannelSameId = ({ channels, id }: FilterChannelSameId) =>
  channels.filter(({ channelId }) => channelId === id);

export const getChannelInfo = ({ channels, id }: GetChannelInfo) => {
  const [target] = filterChannelSameId({ channels, id });
  return (
    target ??
    ({
      teamId: 0,
      channelId: -1,
      name: 'General',
    } as ChannelType)
  );
};
