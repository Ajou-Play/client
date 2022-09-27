import { rest } from 'msw';

import {
  mockGetToken,
  mockGetUserInfo,
  mockLocalLogin,
  mockLogOut,
  mockRegister,
  mockSocialLogin,
  mockUpdatePw,
  mockUpdateUserInfo,
} from './handler';

export const UserHandler = [
  rest.post('/api/v1/users/local/signin', mockLocalLogin),
  rest.post('/api/v1/users/oauth/signin/:registeraionId', mockSocialLogin),
  rest.post('/api/v1/users/signup', mockRegister),
  rest.patch('/api/v1/users/logout', mockLogOut),
  rest.post('/api/v1/users/token/reissue', mockGetToken),
  rest.get('/api/v1/users/:userId/info', mockGetUserInfo),
  rest.patch('/api/v1/users/me/info', mockUpdateUserInfo),
  rest.patch('/api/v1/users/me/password', mockUpdatePw),
];
