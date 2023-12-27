/* eslint-disable prettier/prettier */
import { AddressController } from './address.controller';
import { ChatController } from 'src/modules/chat/chat.controller';
import { AuthController } from './auth.controller';
import { PermissionController } from './permission.controller';
import { ReviewController } from './review.controller';
import { UserController } from './user.controller';
import { ChatGateway } from 'src/modules/chat/chat.gateway';

export const UserControllers = [
  UserController,
  AuthController,
  PermissionController,
  ReviewController,
  AddressController,
  ChatController,
];
