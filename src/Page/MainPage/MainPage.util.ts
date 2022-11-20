import axios from '@Util/axios';

export const getTeams = async () => {
  const res = await axios.get(`/teams`);
  return res.data;
};

export const getChannels = async ({ teamId }: { teamId: number }) => {
  const res = await axios.get(`/teams/${teamId}/channels`);
  return res.data;
};

export const getMembers = async ({ teamId }: { teamId: number }) => {
  const res = await axios.get(`/teams/${teamId}`);
  return res.data.members;
};

export const getArchives = async () => {
  const res = await axios.get(`/archives`);
  return res.data;
};
