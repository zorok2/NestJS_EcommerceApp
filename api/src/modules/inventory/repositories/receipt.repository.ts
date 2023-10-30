import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryReceipt } from '../../../entities/inventory/inventory-receipt.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ReceiptRepository {
  constructor(
    @InjectRepository(InventoryReceipt)
    private inventoryReceiptRepository: Repository<InventoryReceipt>,
  ) { }

  async create(inventoryReceipt: InventoryReceipt): Promise<InventoryReceipt> {
    return await this.inventoryReceiptRepository.save(inventoryReceipt);
  }

  async findAll(): Promise<InventoryReceipt[]> {
    return await this.inventoryReceiptRepository.find();
  }

  async findOne(id: string): Promise<InventoryReceipt> {
    const options: FindOneOptions<InventoryReceipt> = {
      where: {
        inventoryReceiptId: id,
      },
    };
    return await this.inventoryReceiptRepository.findOne(options);
  }

  async update(
    id: string,
    inventoryReceipt: InventoryReceipt,
  ): Promise<InventoryReceipt> {
    await this.inventoryReceiptRepository.update(id, inventoryReceipt);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.inventoryReceiptRepository.delete(id);
  }
}
