/* eslint-disable no-unused-vars */
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest } from 'msw';

export type Props = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => any;
