/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      //token

      const { userId } = request.user.userId;
      const user = await this.userService.getUserById(userId);
      console.log(user);
      return (
        user.data.Permission.name === 'admin' ||
        user.data.Permission.name === 'user' ||
        user.data.Permission.name === 'inventory admin'
        /// check permission nào thì lấy permission đó
      );
    }
    console.log('fail');
    return true;
  }
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      //token
      const { userId } = request.user.userId;
      const user = await this.userService.getUserById(userId);
      console.log(user);
      return (
        user.data.Permission.name === 'admin' ||
        user.data.Permission.name === 'user' ||
        user.data.Permission.name === 'inventory admin'
        /// check permission nào thì lấy permission đó
      );
    }
    console.log('fail');
    return true;
  }
}
