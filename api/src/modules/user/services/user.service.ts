/* eslint-disable prettier/prettier */
import { GetAccountByIdQuery } from './../queries/get-account-byId.query';
import { GetAllAccountQuery } from './../queries/get-all-account.query';
import { UserRepositories } from './../repositories/index';
import { async } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus, EventBus } from '@nestjs/cqrs';
import { ResponseStatus, ResponseBase } from 'src/shared/payload/response-base';
import {
  ChangeAvtUserCommand,
  ChangePasswordCommand,
  ChangePermissionCommand,
  CreateUserCommand,
  UpdateUserCommand,
} from '../commands/user.command';
import {
  ChangePermissionDto,
  UpdateUserDto,
} from '../dto/request/update-user.dto';
import { FirebaseService } from 'src/shared/file-upload/firebase/firebase.service';
import { BCryptService } from 'src/lib/utils/bcrypt.service';
import { GetAccountByNameQuery } from '../queries/get-account-byName.query';
import { CreateUserDto } from '../dto/request/create-users.dto';
import { FindUserLoginQuery } from '../queries/find-user-login.query';
import { CryptoService } from 'src/lib/utils/ rsa.service';
import { UserRepository } from '../repositories/user.repository';
import { AddAddressDto } from '../dto/request/add-address.dto';
import { AuthService } from './auth.service';
import { ReviewService } from './review.service';
import { AddAddressUserCommand } from '../commands/add-addressUser.command';

@Injectable()
export class UserService {
  constructor(
    private readonly review: ReviewService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
    private readonly cryptoServicea: CryptoService,
    private readonly firebaseService: FirebaseService,
    private readonly bcryptService: BCryptService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async createUser(userData: CreateUserDto, avatar?): Promise<ResponseBase> {
    try {
      const findUser = await this.userRepository.findByUserName(
        userData.username,
      );
      if (findUser) {
        return new ResponseBase(ResponseStatus.Failure, 'User already exist');
      }
      const user = await this.commandBus.execute(
        new CreateUserCommand(userData, avatar),
      );
      return new ResponseBase(ResponseStatus.Success, 'Created User', user);
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async findByLogin(username: string, password: string): Promise<ResponseBase> {
    try {
      this.logger.debug('check login: ');
      // check user exist
      const user = await this.queryBus.execute(
        new FindUserLoginQuery(username),
      );

      this.logger.log('User login:' + JSON.stringify(user));
      if (!user) {
        return new ResponseBase(ResponseStatus.Failure, 'User not found');
      }
      // compare password
      const isEqualPassword = await this.bcryptService.comparePassword(
        password,
        user.password,
      );

      this.logger.log('password compare:' + isEqualPassword);

      if (!isEqualPassword) {
        return new ResponseBase(
          ResponseStatus.Failure,
          'Incorrect account or password',
        );
      } else {
        return new ResponseBase(ResponseStatus.Success, 'Login success', user);
      }
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getList(): Promise<ResponseBase> {
    try {
      const user = await this.queryBus.execute(new GetAllAccountQuery());
      return new ResponseBase(
        ResponseStatus.Success,
        'Get List User Successfully!',
        user,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getUserById(id: string): Promise<ResponseBase> {
    try {
      const user = await this.queryBus.execute(new GetAccountByIdQuery(id));
      return new ResponseBase(
        ResponseStatus.Success,
        'Create User Successfully!',
        user,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
  async getUserByUsername(username: string): Promise<ResponseBase> {
    try {
      const user = await this.queryBus.execute(
        new GetAccountByNameQuery(username),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Get User Successfully!',
        user,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async updateUser(userData: UpdateUserDto): Promise<ResponseBase> {
    try {
      const user = await this.commandBus.execute(
        new UpdateUserCommand(userData),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Update user successfully!',
        user,
      );
    } catch (error) {
      throw new ResponseBase(
        ResponseStatus.Failure,
        'Update user fail',
        error.message,
      );
    }
  }

  async changePassword(
    userId: string,
    oldPass: string,
    newPass: string,
  ): Promise<ResponseBase> {
    const user = await this.queryBus.execute(new GetAccountByIdQuery(userId));
    try {
      const newPassword = await this.bcryptService.hashPassWord(newPass);
      const check = await this.bcryptService.comparePassword(
        oldPass,
        user.password,
      );
      this.logger.debug(check);
      if (check) {
        const result = await this.commandBus.execute(
          new ChangePasswordCommand(userId, newPassword),
        );
        return new ResponseBase(
          ResponseStatus.Success,
          'Update user successfully!',
          result,
        );
      } else {
        return new ResponseBase(ResponseStatus.Failure, 'Pass user Wrong!');
      }
    } catch (error) {
      throw new ResponseBase(
        ResponseStatus.Failure,
        'Update user fail',
        error.message,
      );
    }
  }

  async changeAvtUser(
    userId: string,
    avtChange?: Express.Multer.File,
  ): Promise<ResponseBase> {
    try {
      this.logger.debug(userId);
      let urlAvtUser;
      if (avtChange) {
        (await this.firebaseService.uploadFile([avtChange])).map((imageUrl) => {
          urlAvtUser = imageUrl;
        });
        this.logger.debug(avtChange.originalname);
      }
      const user = await this.commandBus.execute(
        new ChangeAvtUserCommand(userId, urlAvtUser),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Update user avatar successfully!',
        user,
      );
    } catch (error) {
      throw new ResponseBase(
        ResponseStatus.Failure,
        'Update user fail',
        error.message,
      );
    }
  }

  async changePermission(userData: ChangePermissionDto): Promise<ResponseBase> {
    try {
      const user = await this.commandBus.execute(
        new ChangePermissionCommand(userData),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Update user permission successfully!',
        user,
      );
    } catch (error) {
      throw new ResponseBase(
        ResponseStatus.Failure,
        'Update user fail',
        error.message,
      );
    }
  }

  async getPermission(userId: string): Promise<any> {
    const user = await this.queryBus.execute(new GetAccountByIdQuery(userId));
    return user.Permission.name;
  }

  async addAddressUser(userAddressDto: AddAddressDto): Promise<any> {
    try {
     
      const result = await this.commandBus.execute(
        new AddAddressUserCommand(userAddressDto),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Thêm địa chỉ thành công',
        result,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
