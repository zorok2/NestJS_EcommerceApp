import { EccService } from './../../../lib/utils/ecc.service';
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from '../dto/request/user-login.dto';
import { CryptoService } from 'src/lib/utils/ rsa.service';
import { CreateUserDto } from '../dto/request/create-users.dto';
import { Default } from 'config';
import { RegisterUserDto } from '../dto/request/register-user.dto';
import { Request, Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ) {}

  @ApiOperation({
    summary:
      '[APP_CLIENT] Use rsa to hash username and password create credential',
    description: 'App client could be web or mobile apps',
  })
  @Post('login')
  @HttpCode(200)
  getAuthenticate(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.login(userLoginDto.username, userLoginDto.password);
  }

  @ApiOperation({
    summary:
      '[APP_CLIENT] Get publickey from auth service to hash username and password',
  })
  @HttpCode(200)
  @Get('/public-key')
  async getPublicKey() {
    return this.authService.getPublicKey();
  }

  @Post('/login')
  async login(@Body() user: UserLoginDto) {
    return this.authService.login(user.username, user.password);
  }

  @Post('/register')
  async resgister(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('/credential')
  createCredential(@Body() userdto: UserLoginDto) {
    return this.cryptoService.encrypt(
      Default.PUBLIC_KEY,
      JSON.stringify(userdto),
    );
  }

  @Get('/decrypt')
  giaima(@Query('mahoa') mahoa: string) {
    this.logger.debug('giai ma');
  }

  @Get('/distance')
  async calculate(
    @Query('destination') destination: string,
    @Query('origin') origin: string,
  ) {
    console.log(destination, origin);
    const distance = this.authService.getDistance(destination, origin);
    return distance;
  }

  @Get('/location')
  async getLocation(@Query('address') address: string) {
    const location = this.authService.getLocation(address);
    return location;
  }
}
