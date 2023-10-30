/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { FirebaseService } from 'src/shared/file-upload/firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '../dto/request/create-users.dto';
import {
  UpdateUserDto,
  ChangePermissionDto,
} from '../dto/request/update-user.dto';
import { AddressRepository } from '../repositories/address.repository';
import { PermissionRepository } from '../repositories/permission.repository';
import { UserRepository } from '../repositories/user.repository';
import { User } from 'src/entities/user/user.entity';
import { BCryptService } from 'src/lib/utils/bcrypt.service';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';

export class CreateUserCommand {
  constructor(
    public readonly userDto: CreateUserDto,
    public readonly avatar?: any,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(CreateUserCommandHandler.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly firebaseService: FirebaseService,
    private readonly permissionRepo: PermissionRepository,
    private readonly bcryptService: BCryptService,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    this.logger.debug('CREATE USER');

    const userMain = new User();
    let avatar;
    if (command.avatar) {
      avatar = await this.firebaseService.uploadFile([command.avatar]);
      userMain.avatarUrl = avatar[0];
    }
    userMain.id = uuidv4();
    userMain.fullname = command.userDto.fullname;
    userMain.email = command.userDto.email;
    userMain.username = command.userDto.username;
    const password = await this.bcryptService.hashPassWord(
      command.userDto.password,
    );
    userMain.password = password;
    userMain.phone = command.userDto.phone;
    this.logger.debug(userMain);

    userMain.permission = await this.permissionRepo.findById(
      command.userDto.permissionId,
    );
    const result = await this.userRepository.createUser(userMain);
    this.logger.debug(JSON.stringify(result));
    return result;
  }
}

export class UpdateUserCommand {
  constructor(public readonly user: UpdateUserDto) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  private readonly logger = new Logger(UpdateUserCommandHandler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    // command.user.addresses.forEach(async (Address) => {
    //   await this.addressRepository.updateAddress(Address);
    // });
    //this.logger.debug(command.user.addresses);
    return this.userRepository.updateUser(command.user);
  }
}

export class ChangePasswordCommand {
  constructor(
    public readonly userId: string,
    public readonly newPass: string,
  ) {}
}

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  private readonly logger = new Logger(UpdateUserCommandHandler.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<any> {
    this.logger.debug(command.newPass);
    // Kha update eventbus;
    const userUpdated = this.userRepository.changePassword(
      command.userId,
      command.newPass,
    );
    return userUpdated;
  }
}

export class ChangeAvtUserCommand {
  constructor(public readonly userId: string, public readonly avt: string) {}
}

@CommandHandler(ChangeAvtUserCommand)
export class ChangeAvtUserCommandHandler
  implements ICommandHandler<ChangeAvtUserCommand>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: ChangeAvtUserCommand): Promise<any> {
    return this.userRepository.updateAvt(command.userId, command.avt);
  }
}

export class ChangePermissionCommand {
  constructor(public readonly userData: ChangePermissionDto) {}
}

@CommandHandler(ChangePermissionCommand)
export class ChangePermissionCommandHandler
  implements ICommandHandler<ChangePermissionCommand>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: ChangePermissionCommand): Promise<any> {
    return this.userRepository.changPermission(command.userData);
  }
}
