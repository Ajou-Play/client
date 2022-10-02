import { useChannelList, useChannelSelect, useTeamList, useTeamSelect } from './MainPage.hook';

import { TeamList, TeamCreateModal } from '@Component/.';
import { TeamInfoContainer, BasicTeamInfo } from '@Component/TeamInfoContainer';
import { useToggle } from '@Hook/.';

export const MainPage = () => {
  const [teamSelect, handleChangeTeamSelect] = useTeamSelect();
  const [list, handleAddTeam, handleDeleteTeam] = useTeamList();
  const ChannelList = useChannelList({ teamId: list[teamSelect].teamId });
  const [channelSelect, handleChangeChannelSelect] = useChannelSelect();
  const {
    state: modalState,
    trueState: handleModalOpen,
    falseState: handleModalClose,
  } = useToggle(false);
  return (
    <div className='flex'>
      <TeamList
        list={list}
        teamSelect={teamSelect}
        handleChangeTeamSelect={handleChangeTeamSelect}
        handleModalOpen={handleModalOpen}
      />
      <TeamInfoContainer teamName='팀명은 A-play'>
        <BasicTeamInfo
          ChannelList={ChannelList}
          channelSelect={channelSelect}
          handleChangeChannelSelect={handleChangeChannelSelect}
        />
      </TeamInfoContainer>
      {modalState && (
        <TeamCreateModal
          handleAddTeam={handleAddTeam}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
