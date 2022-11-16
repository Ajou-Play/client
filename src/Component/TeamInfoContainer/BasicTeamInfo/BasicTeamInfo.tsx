import { BasicTeamInfoProps } from './BasicTeamInfo.type';

import { Channel } from '@Component/.';

export const BasicTeamInfo = ({
  ChannelList,
  channelSelect,
  handleChangeChannelSelect,
}: BasicTeamInfoProps) => (
  <div
    className='mt-6 w-[100%]'
    onClick={handleChangeChannelSelect}
    aria-hidden
  >
    <Channel
      name='General'
      dataId={-1}
      select={channelSelect === -1}
    />
    {ChannelList.map(({ name, channelId }) => (
      <Channel
        name={name}
        key={channelId}
        dataId={channelId}
        select={channelSelect === channelId}
      />
    ))}
  </div>
);
