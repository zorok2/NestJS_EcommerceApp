import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';
import { JWTService } from './jwt.service';
import { ReviewService } from './review.service';

export const UserServices = [
  UserService,
  AuthService,
  PermissionService,
  JWTService,
  ReviewService,
];
