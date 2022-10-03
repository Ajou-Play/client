import { useState, useCallback, useEffect } from 'react';

import { UseTeamSelect, UseTeamList, UseChannelSelect } from './MainPage.type';
import { getChannels, getTeams } from './MainPage.util';

import { ChannelType } from '@Component/TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';
import { TeamType } from '@Component/TeamList/TeamList.type';

export const useTeamList: UseTeamList = () => {
  const [list, setList] = useState<TeamType[]>([]);
  const handleAddTeam = ({ teamId, img, name }: TeamType) => {
    setList((prev) => [
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
    setList((prev) => prev.filter((item) => (item?.teamId ?? -1) !== id));
  };

  useEffect(() => {
    getTeams()
      .then(setList)
      .catch((e) => setList([]));
  }, []);

  return [list, handleAddTeam, handleDeleteTeam];
};

export const useTeamSelect = (): UseTeamSelect => {
  const [teamSelect, setTeamSelect] = useState(0);
  const handleChangeTeamSelect = useCallback((e: any) => {
    const target = e.target.closest('#TeamItem');
    if (!target) return;
    setTeamSelect(Number(target.dataset.id));
  }, []);
  return [teamSelect, handleChangeTeamSelect];
};

export const useChannelList = ({ teamId }: { teamId: number }) => {
  const [list, setList] = useState<ChannelType[]>([]);

  useEffect(() => {
    getChannels({ teamId })
      .then(setList)
      .catch((e) => setList([]));
  }, [teamId]);

  return list;
};

export const useChannelSelect = (deps: number): UseChannelSelect => {
  const [select, setSelect] = useState<number>(-1);
  const handleChangeSelect = (e: any) => {
    const target = e.target.closest('#ChannelItem');
    if (!target) return;
    setSelect(Number(target.dataset.id));
  };

  useEffect(() => {
    setSelect(-1);
  }, [deps]);

  return [select, handleChangeSelect];
};
