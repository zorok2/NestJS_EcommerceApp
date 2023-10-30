/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../../../entities/product/provider.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProviderRepository {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async findAll(): Promise<Provider[]> {
    return await this.providerRepository.find({
      // skip: (page - 1) * pageSize,
      // take: pageSize,
    });
  }

  async findById(id: string): Promise<Provider> {
    const options: FindOneOptions<Provider> = {
      where: {
        id: id,
      },
    };
    return this.providerRepository.findOne(options);
  }

  async findByName(name: string): Promise<Provider[]> {
    const providers = this.providerRepository.find();
    const result = (await providers).filter((provider) =>
      provider.id.includes(name),
    );
    return result;
  }

  async findOneByName(name: string): Promise<Provider> {
    const options: FindOneOptions<Provider> = {
      where: {
        name: name,
      },
    };
    return this.providerRepository.findOne(options);
  }

  async create(provider: Provider): Promise<Provider> {
    return await this.providerRepository.save(provider);
  }

  async update(provider: Provider): Promise<Provider> {
    return this.providerRepository.save(provider);
  }

  async delete(id: string): Promise<void> {
    await this.providerRepository.delete(id);
  }
}
