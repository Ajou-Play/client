import axios from '@Util/axios';

export const addTeam = async (body: { name: string; members: string[] }) => {
  const formData = new FormData();
  formData.append(
    'data',
    new Blob(
      [
        JSON.stringify({
          ...body,
          description: 'dd',
          isPublic: true,
        }),
      ],
      { type: 'application/json' },
    ),
  );
  const res = await axios.post('/teams', formData);
  return res;
};
