import {
  useChannelList,
  useChannelSelect,
  useMemberList,
  useGetArchiveItems,
  useTeamList,
  useTeamSelect,
  useHandleBodyComponent,
} from './MainPage.hook';

import {
  windowType,
  TeamInfoContainer,
  TeamList,
  ChannelInfoContainer,
  WindowContainer,
  MainView,
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
  const { teamList, handleAddTeam, handleDeleteTeam } = useTeamList();

  const { channelSelect, handleChangeChannelSelect } = useChannelSelect(teamSelect);
  const channelList = useChannelList({ teamId: teamList[teamSelect]?.teamId });
  const archiveItems = useGetArchiveItems();
  const memberItems = useMemberList({ teamId: teamList[teamSelect]?.teamId });
  const { body, handleArchiveButtonClick } = useHandleBodyComponent();
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
        handleArchiveButtonClick={handleArchiveButtonClick}
      >
        <MainView
          archiveItems={archiveItems}
          body={body}
        />
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
