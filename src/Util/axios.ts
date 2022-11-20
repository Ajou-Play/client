import axios, { AxiosInstance } from 'axios';

const _: AxiosInstance = axios.create({
  baseURL: 'https://www.aplay.n-e.kr/api/v1',
  // withCredentials: true,
});

export default _;
