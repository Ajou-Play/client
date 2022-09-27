import { Props } from '../type';

export const mockCreateChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockPatchChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockDeleteChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetChannel: Props = (req, res, ctx) => res(ctx.json(true));
export const mockGetChannels: Props = (req, res, ctx) => res(ctx.json(true));
