import { useChannelList, useChannelSelect, useTeamList, useTeamSelect } from './MainPage.hook';

import {
  TeamInfoContainer,
  BasicTeamInfo,
  TeamList,
  TeamCreateModal,
  ChannelInfoContainer,
} from '@Component/.';
import { getChannelInfo } from '@Component/ChannelInfoContainer/ChannelInfoContainer.util';
import { useToggle } from '@Hook/.';

export const MainPage = () => {
  const [teamList, handleAddTeam, handleDeleteTeam] = useTeamList();
  const [teamSelect, handleChangeTeamSelect] = useTeamSelect();

  const channelList = useChannelList({ teamId: teamList[teamSelect]?.teamId });
  const [channelSelect, handleChangeChannelSelect] = useChannelSelect(teamSelect);

  const {
    state: modalState,
    trueState: handleModalOpen,
    falseState: handleModalClose,
  } = useToggle(false);

  return (
    <div className='flex'>
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
      <ChannelInfoContainer {...getChannelInfo({ channels: channelList, id: channelSelect })}>
        <div>1</div>
      </ChannelInfoContainer>
      {modalState && (
        <TeamCreateModal
          handleAddTeam={handleAddTeam}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
