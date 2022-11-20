import axios, { AxiosInstance } from 'axios';

import { getStorageItem, setStorageItem } from './storage';

const _: AxiosInstance = axios.create({
  baseURL: 'https://www.aplay.n-e.kr/api/v1',
  // withCredentials: true,
});

const reIssueToken = () => {
  const userId = getStorageItem('userId');
  const accessToken = document.cookie;
  const refreshToken = getStorageItem('refresh');
  return _.post('/users/token/reissue', {
    userId,
    accessToken,
    refreshToken,
  }).then((res) => {
    const {
      // eslint-disable-next-line no-shadow
      data: { userId, accessToken, refreshToken },
    } = res;
    document.cookie = accessToken;
    setStorageItem('refresh', refreshToken);
    setStorageItem('userId', userId);
  });
};

const customAxios = {
  get: (url: string) =>
    _.get(url).catch((e) => {
      if (e.statusCode === 400) reIssueToken().then(() => _.get(url));
    }),
  post: (url: string, body: any) =>
    _.post(url, body).catch((e) => {
      if (e.statusCode === 400) reIssueToken().then(() => _.post(url, body));
    }),
};
export default customAxios;
