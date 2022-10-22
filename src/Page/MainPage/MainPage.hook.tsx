import { useState, useCallback, useEffect } from 'react';

import { UseTeamSelect, UseTeamList, UseChannelSelect, MainPageBody } from './MainPage.type';
import { getChannels, getTeams, getMembers, getArchives } from './MainPage.util';

import { ChannelType } from '@Component/TeamInfoContainer/BasicTeamInfo/BasicTeamInfo.type';
import { TeamType } from '@Component/TeamList/TeamList.type';
import { getElementData } from '@Util/.';

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

export const useTeamSelect = (): UseTeamSelect => {
  const [teamSelect, setTeamSelect] = useState(0);
  const handleChangeTeamSelect = useCallback((e: any) => {
    const id = getElementData(e, '#TeamItem');
    if (!id) return;
    setTeamSelect(Number(id));
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

const DONT_SELECT_CHANNEL = -1;
export const useChannelSelect = (deps: number): UseChannelSelect => {
  const [channelSelect, setChannelSelect] = useState<number>(-1);
  const handleChangeChannelSelect = (e: any) => {
    const id = getElementData(e, '#ChannelItem');
    if (!id) return;
    setChannelSelect(Number(id));
  };

  useEffect(() => {
    setChannelSelect(DONT_SELECT_CHANNEL);
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
      .catch(() => setMemberList([]));
  }, [teamId]);

  return memberList;
};

export const useGetArchiveItems = () => {
  const [archiveList, setArchiveList] = useState([]);

  useEffect(() => {
    getArchives()
      .then(setArchiveList)
      .catch(() => setArchiveList([]));
  }, []);

  return archiveList;
};

export const useHandleBodyComponent = () => {
  const [body, setBody] = useState<MainPageBody>('Home');
  const handleChangeBodyToArchive = () => setBody('Archive');
  const handleChangeBodyToHome = () => setBody('Home');
  const handleArchiveButtonClick =
    body === 'Home' ? handleChangeBodyToArchive : handleChangeBodyToHome;
  return {
    body,
    handleArchiveButtonClick,
  };
};
