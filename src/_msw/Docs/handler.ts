import { Props } from '../type';

export const mockCreateDocs: Props = (req, res, ctx) => res(ctx.json(true));
export const mockDeleteDocs: Props = (req, res, ctx) => res(ctx.json(true));
