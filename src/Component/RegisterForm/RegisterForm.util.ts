import axios from 'axios';

export const signUp = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(
    `/api/v1/users/signup`,
    { withCredentials: true },
    {
      data: { name, email, password },
    },
  );
  return res.data;
};
