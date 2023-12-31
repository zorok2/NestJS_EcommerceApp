import { async } from 'rxjs';
/* eslint-disable prettier/prettier */
import { CreateUserDto } from './../dto/request/create-users.dto';
import {
  Controller,
  Logger,
  Get,
  Param,
  Put,
  UseInterceptors,
  UploadedFiles,
  Post,
  Body,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  UpdateUserDto,
  ChangePassWordDto,
  ChangePermissionDto,
} from '../dto/request/update-user.dto';
import { UserService } from '../services/user.service';
import { AuthGuard, UserGuard } from 'src/lib/guard/auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AddAddressDto } from '../dto/request/add-address.dto';
import { MapProxy } from 'src/lib/proxy/map/map.proxy';
import { addressDTO, getDistance } from '../dto/request/user-login.dto';
import { UpdatePassworDto } from '../dto/update_password.dto';

@ApiTags('User Endpoint')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mapProxy: MapProxy,
  ) {}
  private readonly logger = new Logger(UserController.name);

  @ApiHeader({
    name: 'Authentication',
    description: 'Contain <Bearer SomeToken>',
  })
  @ApiOperation({
    summary: '[[ADMIN]] Get all account in system',
    description:
      'Admin can get all user account in system and create new role for them; Only account is customer cannot promote to high level',
  })
  @Get()
  @UseGuards(AuthGuard, UserGuard)
  async getAllUser() {
    const users = await this.userService.getList();
    return users;
  }

  @ApiHeader({
    name: 'Authentication',
    description: 'Contain <Bearer SomeToken>',
  })
  @ApiOperation({
    summary: '[[ADMIN]] Get specific account in system',
    description:
      'Admin can get specific user account in system and create new role for them; Only account is customer cannot promote to high level',
  })
  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @ApiHeader({
    name: 'Authentication',
    description: 'Contain <Bearer SomeToken>',
  })
  @ApiOperation({
    summary:
      '[[ADMIN, CUSTOMER, STAFF, INVENTORY_MANAGEMENT]] Can update their account',
    description:
      'Admin can update all account lower level, other users can update their account',
  })
  @Get('username/:username')
  async getByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    return user;
  }
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  @Put('update')
  async updateUser(@Body() userData: UpdateUserDto) {
    const user = await this.userService.updateUser(userData);
    return user;
  }
  @Put('updatePassword')
  async updateUserPassword(@Body() userUpdate: UpdatePassworDto) {
    const user = await this.userService.UpdatePassword(userUpdate);
    return user;
  }

  @ApiOperation({
    summary:
      '[[ADMIN, CUSTOMER, STAFF, INVENTORY_MANAGEMENT]] Can update their account',
    description:
      'Admin can update all account lower level, other users can update their account',
  })
  @Put(':id/avatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avtUser', maxCount: 1 }]))
  async updateAvatar(
    @Param('id') id: string,
    @UploadedFiles() avtUser: { avtUser?: Express.Multer.File },
  ): Promise<any> {
    const avtToSave = avtUser?.avtUser?.[0];
    const user = await this.userService.changeAvtUser(id, avtToSave);
    return user;
  }

  @ApiOperation({
    summary:
      '[[ADMIN, CUSTOMER, STAFF, INVENTORY_MANAGEMENT]] Can update their account',
    description:
      'Admin can update all account lower level, other users can update their account',
  })
  @Put('password')
  async updatePassword(@Body() passDto: ChangePassWordDto): Promise<any> {
    const user = await this.userService.changePassword(
      passDto.userId,
      passDto.pass,
      passDto.newPass,
    );
    return user;
  }
  @ApiOperation({
    summary: '[[ADMIN]] Only admin can update role of user',
    description: "Admin can't change role CUSTOMER to higher level",
  })
  @Put('permission')
  async updatePermission(@Body() userData: ChangePermissionDto): Promise<any> {
    const user = await this.userService.changePermission(userData);
    this.logger.debug(userData);
    return user;
  }

  @ApiOperation({
    summary: '[[ADMIN, CUSTOMER]] User register or admin create user',
    description:
      'User register default role is "customer", Admin create account role is Admin"s choose, Only token with role Admin can create user with specific role',
  })
  @ApiBody({
    description: 'Create user dto',
    type: CreateUserDto,
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  createUser(
    @Body() user: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.createUser(user, avatar);
  }

  @Get('/profile')
  @UseGuards()
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Get('/address/:name')
  async getLocation(@Param('name') address: string): Promise<any> {
    return {
      location: await this.mapProxy.getLocation(address),
    };
  }

  @Get('/distance')
  async getDistance(@Body() getDistanDto: getDistance): Promise<any> {
    return this.mapProxy.getDistance(getDistanDto.desti, getDistanDto.origin);
  }
}
