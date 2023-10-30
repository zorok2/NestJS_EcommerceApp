/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../../../entities/inventory/inventory.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) { }

  async create(inventory: Inventory): Promise<Inventory> {
    return await this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find();
  }

  async findOne(id: string): Promise<Inventory> {
    const options: FindOneOptions<Inventory> = {
      where: {
        id: id,
      },
    };
    return await this.inventoryRepository.findOne(options);
  }

  async findByName(name: string): Promise<Inventory> {
    const options: FindOneOptions<Inventory> = {
      where: {
        inventoryName: name,
      },
    };
    return await this.inventoryRepository.findOne(options);
  }

  async update(id: string, inventory: Inventory): Promise<Inventory> {
    await this.inventoryRepository.update(id, inventory);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
}
