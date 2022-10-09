import axios from 'axios';

export const getTeams = async () => {
  const res = await axios.get('/api/v1/teams', { withCredentials: true });
  return res.data;
};

export const getChannels = async ({ teamId }: { teamId: number }) => {
  const res = await axios.get(`/api/v1/teams/${teamId}/channels`, { withCredentials: true });
  return res.data;
};

export const addChannel = () => {};