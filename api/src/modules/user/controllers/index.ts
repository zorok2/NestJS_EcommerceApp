import { ChatController } from 'src/modules/chat/chat.controller';
import { AuthController } from './auth.controller';
import { PermissionController } from './permission.controller';
import { ReviewController } from './review.controller';
import { UserController } from './user.controller';

export const UserControllers = [
  UserController,
  AuthController,
  PermissionController,
  ReviewController,
  ChatController,
];
