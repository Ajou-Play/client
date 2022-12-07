import { Outlet } from 'react-router-dom';

import {
  useChannelList,
  useChannelSelect,
  useMemberList,
  useTeamList,
  useTeamSelect,
} from './MainPage.hook';

import {
  windowType,
  TeamInfoContainer,
  TeamList,
  ChannelInfoContainer,
  WindowContainer,
  MeetingContainer,
  BasicTeamInfo,
} from '@Component/.';
import { getChannelInfo } from '@Component/ChannelInfoContainer/ChannelInfoContainer.util';
import { TeamContext } from '@Context/.';
import { useMultiSelection } from '@Hook/.';

export const MainPage = () => {
  const {
    select: windowSelection,
    handleChangeSelect,
    handleInit,
  } = useMultiSelection<windowType>('None');

  const { teamList } = useTeamList();
  const { teamSelect, handleChangeTeamSelect } = useTeamSelect(teamList);
  const { channelSelect, handleChangeChannelSelect } = useChannelSelect(teamSelect);
  const { channelList, handleAddChannel } = useChannelList({
    teamId: teamSelect,
  });
  const memberItems = useMemberList({ teamId: teamList[teamSelect]?.teamId ?? -1 });
  const handleClickWindow = (selectState: windowType) =>
    selectState === windowSelection ? handleInit() : handleChangeSelect(selectState);

  return (
    <TeamContext.Provider value={teamSelect.toString()}>
      <div className='flex '>
        <TeamList
          list={teamList}
          teamSelect={teamSelect}
          handleChangeTeamSelect={handleChangeTeamSelect}
        />

        <TeamInfoContainer teamName={teamList[teamSelect]?.name}>
          <BasicTeamInfo
            handleAddChannel={handleAddChannel}
            ChannelList={channelList}
            channelSelect={channelSelect}
            handleChangeChannelSelect={handleChangeChannelSelect}
          />
          <MeetingContainer chatRoomId={channelSelect} />
        </TeamInfoContainer>

        <ChannelInfoContainer
          {...getChannelInfo({ channels: channelList, id: channelSelect })}
          handleClickWindow={handleClickWindow}
        >
          <Outlet />
        </ChannelInfoContainer>

        {windowSelection !== 'None' && (
          <WindowContainer
            windowSelection={windowSelection}
            memberItems={memberItems}
            handleInit={handleInit}
          />
        )}
      </div>
    </TeamContext.Provider>
  );
};
