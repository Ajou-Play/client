import axios from '@Util/axios';

export const addChannel = async (body: { teamId: string; name: string }) => {
  const res = await axios.post('/channels', body);

  return res.data;
};
