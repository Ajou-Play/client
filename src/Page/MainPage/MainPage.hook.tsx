import { useState, useCallback, useEffect } from 'react';

import { UseTeamSelect, UseTeamList, UseChannelSelect } from './MainPage.type';
import { getChannels, getTeams, getMembers } from './MainPage.util';

import { ChannelType } from '@Component/TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';
import { TeamType } from '@Component/TeamList/TeamList.type';

export const useTeamList: UseTeamList = () => {
  const [teamList, setTeamList] = useState<TeamType[]>([]);
  const handleAddTeam = ({ teamId, img, name }: TeamType) => {
    setTeamList((prev) => [
      ...prev,
      {
        teamId,
        img,
        name,
      },
    ]);
  };
  const handleDeleteTeam = (e: any) => {
    const target = e.target.closest('#TeamOption');
    if (!target) return;
    const { id } = target.dataset;
    setTeamList((prev) => prev.filter((item) => (item?.teamId ?? -1) !== id));
  };

  useEffect(() => {
    getTeams()
      .then(setTeamList)
      .catch((e) => setTeamList([]));
  }, []);

  return { teamList, handleAddTeam, handleDeleteTeam };
};

export const useTeamSelect = (): UseTeamSelect => {
  const [teamSelect, setTeamSelect] = useState(0);
  const handleChangeTeamSelect = useCallback((e: any) => {
    const target = e.target.closest('#TeamItem');
    if (!target) return;
    setTeamSelect(Number(target.dataset.id));
  }, []);
  return { teamSelect, handleChangeTeamSelect };
};

export const useChannelList = ({ teamId }: { teamId: number }) => {
  const [channelList, setChannelList] = useState<ChannelType[]>([]);

  useEffect(() => {
    getChannels({ teamId })
      .then(setChannelList)
      .catch((e) => setChannelList([]));
  }, [teamId]);

  return channelList;
};

export const useChannelSelect = (deps: number): UseChannelSelect => {
  const [channelSelect, setChannelSelect] = useState<number>(-1);
  const handleChangeChannelSelect = (e: any) => {
    const target = e.target.closest('#ChannelItem');
    if (!target) return;
    setChannelSelect(Number(target.dataset.id));
  };

  useEffect(() => {
    setChannelSelect(-1);
  }, [deps]);

  return {
    channelSelect,
    handleChangeChannelSelect,
  };
};

export const useMemberList = ({ teamId }: { teamId: number }) => {
  const [memberList, setMemberList] = useState<any>({});

  useEffect(() => {
    getMembers({ teamId })
      .then(setMemberList)
      .catch((e) => setMemberList([]));
  }, [teamId]);

  return memberList;
};
