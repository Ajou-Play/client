import {
  useChannelList,
  useChannelSelect,
  useMemberList,
  useGetArchiveItems,
  useTeamList,
  useTeamSelect,
  useHandleBodyComponent,
} from './MainPage.hook';

import type { windowType } from '@Component/.';
import {
  TeamInfoContainer,
  BasicTeamInfo,
  TeamList,
  TeamCreateModal,
  ChannelInfoContainer,
  WindowContainer,
  ChannelArchive,
  ChannelHome,
} from '@Component/.';
import { CamChat } from '@Component/CamChat';
import { getChannelInfo } from '@Component/ChannelInfoContainer/ChannelInfoContainer.util';
import { TeamContext } from '@Context/.';
import { WebRTCProvider } from '@Context/WebRTC';
import { useMultiSelection, useToggle } from '@Hook/.';

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
  const {
    state: modalState,
    trueState: handleModalOpen,
    falseState: handleModalClose,
  } = useToggle(false);

  const handleClickWindow = (selectState: windowType) =>
    selectState === windowSelection ? handleInit() : handleChangeSelect(selectState);

  return (
    <div className='flex '>
      <TeamList
        list={teamList}
        teamSelect={teamSelect}
        handleChangeTeamSelect={handleChangeTeamSelect}
        handleModalOpen={handleModalOpen}
      />

      <WebRTCProvider chatRoomId={channelSelect}>
        <ChannelInfoContainer
          {...getChannelInfo({ channels: channelList, id: channelSelect })}
          handleClickWindow={handleClickWindow}
          handleArchiveButtonClick={handleArchiveButtonClick}
        >
          <div className='h-[100%]'>
            {body === 'Home' ? (
              <ChannelHome archiveItems={archiveItems} />
            ) : (
              <ChannelArchive archiveItems={archiveItems} />
            )}
          </div>
          <CamChat />
        </ChannelInfoContainer>
      </WebRTCProvider>
      <TeamContext.Provider value={teamSelect.toString()}>
        {windowSelection !== 'None' && (
          <WindowContainer
            windowSelection={windowSelection}
            memberItems={memberItems}
            handleInit={handleInit}
          />
        )}
      </TeamContext.Provider>
      {modalState && (
        <TeamCreateModal
          handleAddTeam={handleAddTeam}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
