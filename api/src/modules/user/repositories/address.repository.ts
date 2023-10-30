/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/user/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  private readonly logger = new Logger(AddressRepository.name);

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  async findById(addressId: string): Promise<Address> {
    const option: FindOneOptions<Address> = {
      where: {
        id: addressId,
      },
    };
    return this.addressRepository.findOne(option);
  }

  async findByUserName(userName: string): Promise<Address[]> {
    const address = await this.addressRepository.find({
      where: { user: { username: userName } },
    });
    return address;
  }

  async createAddress(address: Address): Promise<Address> {
    return this.addressRepository.save(address);
  }

  async updateAddress(addressToUpdate: Address): Promise<Address> {
    const address = await this.findById(addressToUpdate.id);
    this.logger.debug(addressToUpdate.id);
    const updatedAddress = Object.assign(address, addressToUpdate);
    return this.addressRepository.save(updatedAddress);
  }
}
