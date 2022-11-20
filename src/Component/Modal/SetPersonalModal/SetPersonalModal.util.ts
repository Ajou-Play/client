import axios from '@Util/axios';

export const getMyInfo = async ({ userId }: { userId: number }) => {
  const res = await axios.get(`/users/${userId}/info`);
  return res.data;
};
