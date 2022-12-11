import { useState, useCallback, useEffect } from 'react';

import { UseTeamSelect, UseTeamList, UseChannelSelect } from './MainPage.type';
import { getChannels, getTeams, getMembers, getArchives } from './MainPage.util';

import { ChannelType } from '@Component/TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';
import { TeamType } from '@Component/TeamList/TeamList.type';
import { getElementData } from '@Util/.';

export const useTeamList: UseTeamList = () => {
  const [teamList, setTeamList] = useState<TeamType[]>([]);
  const handleAddTeam = ({ teamId, profileImage, name }: TeamType) => {
    setTeamList((prev) => [
      ...prev,
      {
        teamId,
        profileImage,
        name,
      },
    ]);
  };
  const handleDeleteTeam = (e: any) => {
    const id = getElementData(e, '#TeamOption');
    if (!id) return;
    setTeamList((prev) => prev.filter((item) => (item?.teamId ?? -1) !== Number(id)));
  };

  useEffect(() => {
    getTeams()
      .then(setTeamList)
      .catch((e) => setTeamList([]));
  }, []);

  return { teamList, handleAddTeam, handleDeleteTeam };
};

export const useTeamSelect = (teamList: TeamType[]): UseTeamSelect => {
  const [teamSelect, setTeamSelect] = useState<number>(-1);
  useEffect(() => {
    if (teamList.length === 0) return;
    const [teamData] = teamList;
    setTeamSelect(Number(teamData?.teamId));
  }, [teamList]);

  const handleChangeTeamSelect = useCallback((e: any) => {
    const id = getElementData(e, '#TeamItem');
    if (!id) return;
    setTeamSelect(Number(id));
  }, []);
  return { teamSelect, handleChangeTeamSelect };
};

export const useChannelList = ({ teamId }: { teamId: number }) => {
  const [channelList, setChannelList] = useState<ChannelType[]>([]);

  const handleAddChannel = (channel: ChannelType) => setChannelList([...channelList, channel]);

  useEffect(() => {
    if (teamId === -1) return;
    console.log('ddddd', teamId);
    getChannels({ teamId })
      .then(setChannelList)
      .catch((e) => setChannelList([]));
  }, [teamId]);

  return {
    channelList,
    handleAddChannel,
  };
};

const DONT_SELECT_CHANNEL = -1;
export const useChannelSelect = (deps?: number): UseChannelSelect => {
  const [channelSelect, setChannelSelect] = useState<number>(-1);
  const handleChangeChannelSelect = (e: any) => {
    const id = getElementData(e, '#ChannelItem');
    if (!id) return;
    setChannelSelect(Number(id));
  };

  useEffect(() => {
    console.log('channel', channelSelect);
  }, [channelSelect]);

  useEffect(() => {
    setChannelSelect(DONT_SELECT_CHANNEL);
  }, [deps]);

  return {
    channelSelect,
    handleChangeChannelSelect,
  };
};

export const useMemberList = ({ teamId }: { teamId: number }) => {
  const [memberList, setMemberList] = useState<any>([]);

  useEffect(() => {
    if (teamId === -1) return;
    getMembers({ teamId })
      .then(setMemberList)
      .catch(() => setMemberList([]));
  }, [teamId]);

  return memberList;
};

export const useGetArchiveItems = (channelId: number) => {
  const [archiveList, setArchiveList] = useState([]);

  useEffect(() => {
    console.log('dddddwwdw');
    getArchives(channelId)
      .then(setArchiveList)
      .catch(() => setArchiveList([]));
  }, [channelId]);

  return archiveList;
};
