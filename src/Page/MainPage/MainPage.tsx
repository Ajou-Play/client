import {
  useChannelList,
  useChannelSelect,
  useMemberList,
  useTeamList,
  useTeamSelect,
} from './MainPage.hook';

import type { windowType } from '@/Component/.';
import {
  TeamInfoContainer,
  BasicTeamInfo,
  TeamList,
  TeamCreateModal,
  ChannelInfoContainer,
  WindowContainer,
  ChannelArchive,
} from '@Component/.';
import { getChannelInfo } from '@Component/ChannelInfoContainer/ChannelInfoContainer.util';
import { useMultiSelection, useToggle } from '@Hook/.';

export const MainPage = () => {
  const {
    select: windowSelection,
    handleChangeSelect,
    handleInit,
  } = useMultiSelection<windowType>('None');
  const { teamList, handleAddTeam, handleDeleteTeam } = useTeamList();
  const { teamSelect, handleChangeTeamSelect } = useTeamSelect();

  const channelList = useChannelList({ teamId: teamList[teamSelect]?.teamId });
  const { channelSelect, handleChangeChannelSelect } = useChannelSelect(teamSelect);

  const memberItems = useMemberList({ teamId: teamList[teamSelect]?.teamId });

  const {
    state: modalState,
    trueState: handleModalOpen,
    falseState: handleModalClose,
  } = useToggle(false);

  const handleClick = (selectState: windowType) =>
    selectState === windowSelection ? handleInit() : handleChangeSelect(selectState);

  return (
    <div className='flex '>
      <TeamList
        list={teamList}
        teamSelect={teamSelect}
        handleChangeTeamSelect={handleChangeTeamSelect}
        handleModalOpen={handleModalOpen}
      />
      <TeamInfoContainer teamName={teamList[teamSelect]?.name}>
        <BasicTeamInfo
          ChannelList={channelList}
          channelSelect={channelSelect}
          handleChangeChannelSelect={handleChangeChannelSelect}
        />
      </TeamInfoContainer>
      <ChannelInfoContainer
        {...getChannelInfo({ channels: channelList, id: channelSelect })}
        handleClick={handleClick}
      >
        <ChannelArchive />
      </ChannelInfoContainer>
      {windowSelection !== 'None' && (
        <WindowContainer
          windowSelection={windowSelection}
          memberItems={memberItems}
          handleInit={handleInit}
        />
      )}
      {modalState && (
        <TeamCreateModal
          handleAddTeam={handleAddTeam}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
