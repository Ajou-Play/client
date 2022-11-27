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
  const { teamSelect, handleChangeTeamSelect } = useTeamSelect();
  const { teamList } = useTeamList();

  const { channelSelect, handleChangeChannelSelect } = useChannelSelect(teamSelect);
  const channelList = useChannelList({ teamId: teamList[teamSelect]?.teamId });
  const memberItems = useMemberList({ teamId: teamList[teamSelect]?.teamId });
  const handleClickWindow = (selectState: windowType) =>
    selectState === windowSelection ? handleInit() : handleChangeSelect(selectState);

  return (
    <div className='flex '>
      <TeamList
        list={teamList}
        teamSelect={teamSelect}
        handleChangeTeamSelect={handleChangeTeamSelect}
      />

      <TeamInfoContainer teamName={teamList[teamSelect]?.name}>
        <BasicTeamInfo
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

      <TeamContext.Provider value={teamSelect.toString()}>
        {windowSelection !== 'None' && (
          <WindowContainer
            windowSelection={windowSelection}
            memberItems={memberItems}
            handleInit={handleInit}
          />
        )}
      </TeamContext.Provider>
    </div>
  );
};
