import { Props } from '../type';

export const mockLocalLogin: Props = (req, res, ctx) => {
  const {
    params: { email, password },
  } = req;
  res(
    ctx.json({
      message: '로그인 성공',
      status: 200,
      data: {
        userId: 1,
        accessToken: 'fdafda',
        refreshToken: 'fdafda',
      },
    }),
  );
};
export const mockSocialLogin: Props = (req, res, ctx) => res(ctx.json(true));
export const mockRegister: Props = (req, res, ctx) => {
  const {
    params: { email, name, password },
  } = req;
  return res(
    ctx.json({
      message: '회원가입 성공',
      status: 201,
      data: {
        userId: 1,
        name,
        email,
      },
    }),
  );
};
export const mockLogOut: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetToken: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetUserInfo: Props = (req, res, ctx) => res(ctx.json(true));
export const mockUpdateUserInfo: Props = (req, res, ctx) => res(ctx.json(true));
export const mockUpdatePw: Props = (req, res, ctx) => res(ctx.json(true));
