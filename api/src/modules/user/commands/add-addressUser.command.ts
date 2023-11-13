import { AuthService } from './../services/auth.service';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { AddAddressDto } from '../dto/request/add-address.dto';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from 'src/entities/user/user.entity';
import { uuid } from 'uuidv4';
import { UserRepository } from '../repositories/user.repository';
import { Logger } from '@nestjs/common';
import { v4 } from 'uuid';

export class AddAddressUserCommand implements ICommand {
  constructor(public readonly addressUserDto: AddAddressDto) {}
}

@CommandHandler(AddAddressUserCommand)
export class AddAddressUserCommandHandler
  implements ICommandHandler<AddAddressUserCommand>
{
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly userRepository: UserRepository,
  ) {}
  private readonly logger = new Logger(AddAddressUserCommandHandler.name);
  async execute(command: AddAddressUserCommand): Promise<any> {
    this.logger.debug('debug address ' + command.addressUserDto.address);
    var ad = new Address();
    ad.id = v4();
    ad.address = command.addressUserDto.address;
    ad.phone = command.addressUserDto.Sdt;
    ad.user = await this.userRepository.findById(command.addressUserDto.userID);
    ad.nameUserShipping = command.addressUserDto.userNameShipping;
    //TO DO: location
    return this.addressRepository.createAddress(ad);
  }
}
