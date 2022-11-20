import axios from '@Util/axios';

export const postRegister = async (body: any) => {
  const res = await axios.post('/users/signup', body);
  return res.data;
};
