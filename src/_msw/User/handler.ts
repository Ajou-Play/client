import { Props } from '../type';

export const mockLocalLogin: Props = (req, res, ctx) => res(ctx.json(true));
export const mockSocialLogin: Props = (req, res, ctx) => res(ctx.json(true));
export const mockRegister: Props = (req, res, ctx) => res(ctx.json(true));
export const mockLogOut: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetToken: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetUserInfo: Props = (req, res, ctx) => res(ctx.json(true));
export const mockUpdateUserInfo: Props = (req, res, ctx) => res(ctx.json(true));
export const mockUpdatePw: Props = (req, res, ctx) => res(ctx.json(true));
