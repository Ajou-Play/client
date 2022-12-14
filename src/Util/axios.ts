import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { getStorageItem, setStorageItem } from './storage';

const _: AxiosInstance = axios.create({
  baseURL: 'https://www.aplay.n-e.kr/api/v1',
  withCredentials: true,
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
    _.get(url, { headers: { accessToken: document.cookie } }).catch((e) => {
      if (e.response.data.code === 'U005') reIssueToken().then(() => _.get(url));
    }) as Promise<AxiosResponse<any, any>>,
  post: (url: string, body: any) =>
    _.post(url, body, { headers: { accessToken: document.cookie } }).catch((e) => {
      if (e.response.data.code === 'U005') reIssueToken().then(() => _.post(url, body));
    }) as Promise<AxiosResponse<any, any>>,
};
export default customAxios;
