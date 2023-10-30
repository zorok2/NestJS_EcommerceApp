/* eslint-disable prettier/prettier */

import { GetAccountByIdQueryHandler } from './get-account-byId.query';
import { GetAccountByNameQueryHandler } from './get-account-byName.query';
import { GetAllAccountQueryHandler } from './get-all-account.query';
import { GetAllPermissionQueryHandler } from './get-all-permission.command';
import { GetOnePermissionQueryHandler } from './get-one-permission.command';
import { FindUserLoginQueryHandler } from './find-user-login.query';
import {
  GetAllReviewQuery,
  GetAllReviewQueryHandler,
} from './get-all-review.query';

export const UserQueryHandlers = [
  FindUserLoginQueryHandler,
  GetAccountByIdQueryHandler,
  GetAccountByNameQueryHandler,
  GetAllAccountQueryHandler,
  GetAllPermissionQueryHandler,
  GetOnePermissionQueryHandler,
  GetAllReviewQueryHandler,
];
