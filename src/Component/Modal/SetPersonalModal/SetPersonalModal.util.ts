import axios from 'axios';

export const getMyInfo = async ({ userId }: { userId: number }) => {
  const res = await axios.get(`/api/v1/users/${userId}/info`);
  return res.data;
};
