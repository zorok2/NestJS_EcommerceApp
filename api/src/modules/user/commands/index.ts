/* eslint-disable prettier/prettier */
import { ActivePermissionCommandHandler } from './active-permission.command';
import { CreatePermissionCommandHandler } from './create-permission.conmmand';
import { CreateReviewCommandHandler } from './create_review.command';
import { InvalidPermissionCommandHandler } from './invalid-permission.command';
import {
  ChangeAvtUserCommandHandler,
  ChangePasswordCommandHandler,
  ChangePermissionCommandHandler,
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
} from './user.command';

export const UserCommands = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  ChangePasswordCommandHandler,
  ChangeAvtUserCommandHandler,
  ChangePermissionCommandHandler,
  CreatePermissionCommandHandler,
  InvalidPermissionCommandHandler,
  ActivePermissionCommandHandler,
  CreateReviewCommandHandler,
];
