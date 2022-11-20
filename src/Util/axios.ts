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
  get: (url: string) => {
    const { cookie } = document;
    return _.get(url, {
      headers: {
        accessToken: cookie,
      },
    }).catch((e) => {
      console.log(e);
      console.log(e.code);
      console.log(e.code === 'U005');
      if (e.code === 'U005') reIssueToken().then(() => _.get(url));
    }) as Promise<AxiosResponse<any, any>>;
  },
  post: (url: string, body: any) =>
    _.post(url, body, {
      headers: {
        accessToken: document.cookie,
      },
    }).catch((e) => {
      console.log(e);
      console.log(e.code);
      console.log(e.code === 'U005');
      if (e.code === 'U005') reIssueToken().then(() => _.post(url, body));
    }) as Promise<AxiosResponse<any, any>>,
};
export default customAxios;
