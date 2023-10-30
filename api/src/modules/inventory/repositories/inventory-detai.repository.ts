/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryDetail } from '../../../entities/inventory/inventory-detail.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class InventoryDetailRepository {
  constructor(
    @InjectRepository(InventoryDetail)
    private inventoryDetailRepository: Repository<InventoryDetail>,
  ) {}

  async create(inventoryDetail: InventoryDetail): Promise<InventoryDetail> {
    return await this.inventoryDetailRepository.save(inventoryDetail);
  }

  async findAll(): Promise<InventoryDetail[]> {
    return await this.inventoryDetailRepository.find();
  }

  async findOne(id: string): Promise<InventoryDetail> {
    const options: FindOneOptions<InventoryDetail> = {
      where: {
        id: id,
      },
    };
    return await this.inventoryDetailRepository.findOne(options);
  }

  async update(
    id: string,
    inventoryDetail: InventoryDetail,
  ): Promise<InventoryDetail> {
    await this.inventoryDetailRepository.update(id, inventoryDetail);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.inventoryDetailRepository.delete(id);
  }

  async findByIdProduct(idProduct: string): Promise<InventoryDetail[]> {
    const option: FindOneOptions<InventoryDetail> = {
      where: {
        product: {
          productId: idProduct,
        },
      },
    };
    return this.inventoryDetailRepository.find(option);
  }

  async findByIdProductAndInventoryId(
    idProduct: string,
    inventoryId: string,
  ): Promise<InventoryDetail> {
    const option: FindOneOptions<InventoryDetail> = {
      where: {
        product: {
          productId: idProduct,
        },
        inventory: {
          id: inventoryId,
        },
      },
    };
    return this.inventoryDetailRepository.findOne(option);
  }
}
