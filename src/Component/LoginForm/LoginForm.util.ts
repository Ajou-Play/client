import axios from '@Util/axios';

export const postLogin = async (body: { email: string; password: string }) => {
  const res = await axios.post('/users/local/signin', body);
  console.log(res.data);
  return res.data;
};
