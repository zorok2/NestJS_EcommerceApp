/* eslint-disable prettier/prettier */
import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { CryptoService } from 'src/lib/utils/ rsa.service';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/request/create-users.dto';
import { JwtService } from '@nestjs/jwt';
import { EccService } from 'src/lib/utils/ecc.service';
import { Default } from 'config';
import { log } from 'console';
import { BCryptService } from 'src/lib/utils/bcrypt.service';
import { Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserLoginQuery } from '../queries/find-user-login.query';
import { JWTService } from './jwt.service';
import { User } from 'src/entities/user/user.entity';
import { MapProxy } from 'src/lib/proxy/map/map.proxy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  mapProxy: any;
  constructor(
    private readonly userService: UserService,
    private readonly queryBus: QueryBus,
    private readonly jwtService: JWTService,

    private readonly bcryptService: BCryptService,
    private readonly cryptoService: CryptoService,
  ) {}

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  getPublicKey = async () => {
    return new ResponseBase(
      ResponseStatus.Success,
      'Get public key success',
      Default.PUBLIC_KEY,
    );
  };

  login = async (username: string, password: string) => {
    this.logger.debug('check login: ');

    // check user exist
    const userStored = (await this.queryBus.execute(
      new FindUserLoginQuery(username),
    )) as User;

    this.logger.log('User login:' + JSON.stringify(userStored));
    if (!userStored) {
      return new ResponseBase(ResponseStatus.Failure, 'User not found');
    }
    // compare password
    const isEqualPassword = await this.bcryptService.comparePassword(
      password,
      userStored.password,
    );

    this.logger.log('password compare:' + isEqualPassword);

    if (!isEqualPassword) {
      return new ResponseBase(
        ResponseStatus.Failure,
        'Incorrect account or password',
      );
    }

    const payload = {
      userId: userStored.id,
      permissionId: userStored.permission.id,
      permissionName: userStored.permission.name,
    };
    const token = await this.createToken(payload);

    return new ResponseBase(ResponseStatus.Success, 'Login successfuly', {
      userStored,
      ...token,
    });
  };

  async register(userdto: CreateUserDto) {
    this.logger.debug('register auth');
    const user = await this.userService.createUser(userdto);
    return user;
  }

  async validateUser(username) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async createToken({ userId, permissionId, permissionName }) {
    const accessToken = await this.jwtService.signPayload(
      {
        userId,
        permissionId,
        permissionName,
      },
      {
        expiresIn: '1d',
      },
    );
    const refreshToken = await this.jwtService.signPayload(
      {
        userId,
        permissionId,
        permissionName,
      },
      {
        expiresIn: '100d',
      },
    );
    const decode = await this.jwtService.verifyToken(accessToken);
    this.logger.debug('token: ' + accessToken + '\n');
    this.logger.log('decode: ' + JSON.stringify(decode));
    return {
      accessToken,
      refreshToken,
    };
  }

  getDistance = async (destination: string, origin: string) => {
    const distance = await this.mapProxy.getDistance(destination, origin);
    return distance;
  };

  getLocation = async (address: string) => {
    const location = await this.mapProxy.getLatitudeFromAddress(address);
    return location;
  };
}
