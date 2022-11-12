import {
  useChannelList,
  useChannelSelect,
  useMemberList,
  useGetArchiveItems,
  useTeamList,
  useTeamSelect,
  useHandleBodyComponent,
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
  ChannelHome,
} from '@Component/.';
import { getChannelInfo } from '@Component/ChannelInfoContainer/ChannelInfoContainer.util';
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

  const handleClick = (selectState: windowType) =>
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
      </TeamInfoContainer>

      <ChannelInfoContainer
        {...getChannelInfo({ channels: channelList, id: channelSelect })}
        handleClick={handleClick}
        handleArchiveButtonClick={handleArchiveButtonClick}
      >
        {body === 'Home' ? (
          <ChannelHome archiveItems={archiveItems} />
        ) : (
          <ChannelArchive archiveItems={archiveItems} />
        )}
      </ChannelInfoContainer>
      {windowSelection !== 'None' && (
        <WindowContainer
          windowSelection={windowSelection}
          memberItems={memberItems}
          handleInit={handleInit}
        />
      )}
    </div>
  );
};
