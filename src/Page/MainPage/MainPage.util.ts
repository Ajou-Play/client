import axios from '@Util/axios';

export const getTeams = async () => {
  const res = await axios.get(`/teams`);
  return res.data.data;
};

export const getChannels = async ({ teamId }: { teamId: number }) => {
  const res = await axios.get(`/teams/${teamId}/channels`);
  return res.data.data;
};

export const getMembers = async ({ teamId }: { teamId: number }) => {
  const res = await axios.get(`/teams/${teamId}`);
  return res.data.members;
};

export const getArchives = async (channelId: number) => {
  const res = await axios.get(`/channels/${channelId}/docs?page=0&size=10`);
  return res.data.data.content;
};
