import { handlers as rest } from './generated/rest.handlers';
import { handlers as graphql } from './generated/graphql.handlers';

export const handlers = [
  ...rest,
  ...graphql
];
