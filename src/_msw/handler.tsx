/* eslint-disable no-unused-vars */
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest } from 'msw';

type Props = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => any;

export const mockTest: Props = (req, res, ctx) => res(ctx.json(true));
