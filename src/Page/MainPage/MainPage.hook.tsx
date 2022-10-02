import { useState, useCallback } from 'react';

import { UseTeamSelect, UseTeamList, UseChannelSelect } from './MainPage.type';

import { ChannelType } from '@Component/TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';
import { TeamType, TempList } from '@Component/TeamList/TeamList.type';

const tempTeamList: TempList = [
  {
    teamId: 1,
    img: '/asset/1.jpeg',
    name: 'rr',
  },
  {
    teamId: 2,
    img: '/asset/2.jpeg',
    name: 'ss',
  },
  {
    teamId: 3,
    img: '/asset/3.png',
    name: 'dd',
  },
];

const tempChannelList: ChannelType[] = [
  {
    teamId: 1,
    channelId: 1,
    name: '1채널 이름',
  },
  {
    teamId: 1,
    channelId: 2,
    name: '2채널 이름',
  },
  {
    teamId: 1,
    channelId: 3,
    name: '3채널 이름',
  },
];

export const useTeamSelect = (): UseTeamSelect => {
  const [teamSelect, setTeamSelect] = useState(0);
  const handleChangeTeamSelect = useCallback((e: any) => {
    const target = e.target.closest('#TeamItem');
    if (!target) return;
    setTeamSelect(Number(target.dataset.id));
  }, []);
  return [teamSelect, handleChangeTeamSelect];
};

export const useTeamList: UseTeamList = () => {
  const [list, setList] = useState(tempTeamList);
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
    setList((prev) => prev.filter((item) => item.teamId !== id));
  };
  return [list, handleAddTeam, handleDeleteTeam];
};

export const useChannelList = ({ teamId }: { teamId: number }) => {
  const [list, setList] = useState<ChannelType[]>(tempChannelList);
  return list;
};

export const useChannelSelect = (): UseChannelSelect => {
  const [select, setSelect] = useState<number>(-1);
  const handleChangeSelect = (e: any) => {
    const target = e.target.closest('#ChannelItem');
    if (!target) return;
    setSelect(Number(target.dataset.id));
  };
  return [select, handleChangeSelect];
};
