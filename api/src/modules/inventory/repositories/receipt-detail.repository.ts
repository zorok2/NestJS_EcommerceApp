/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryReceiptDetail } from '../../../entities/inventory/inventory-receipt-detail.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ReceiptDetailsRepository {
  constructor(
    @InjectRepository(InventoryReceiptDetail)
    private inventoryReceiptDetailRepository: Repository<InventoryReceiptDetail>,
  ) { }

  async findAll(): Promise<InventoryReceiptDetail[]> {
    return this.inventoryReceiptDetailRepository.find();
  }

  async findById(id: string): Promise<InventoryReceiptDetail[]> {
    return this.inventoryReceiptDetailRepository.find({
      where: { inventoryReceipt: { inventoryReceiptId: id } },
      relations: {
        product: true,
        inventoryReceipt: true,
      },
    });
  }

  async create(
    inventoryReceiptDetail: Partial<InventoryReceiptDetail>,
  ): Promise<InventoryReceiptDetail> {
    return this.inventoryReceiptDetailRepository.save(inventoryReceiptDetail);
  }

  async update(
    id: string,
    inventoryReceiptDetail: Partial<InventoryReceiptDetail>,
  ): Promise<InventoryReceiptDetail> {
    await this.inventoryReceiptDetailRepository.update(
      id,
      inventoryReceiptDetail,
    );
    const options: FindOneOptions<InventoryReceiptDetail> = {
      where: {
        id: id,
      },
    };
    return this.inventoryReceiptDetailRepository.findOne(options);
  }

  async delete(id: string): Promise<void> {
    await this.inventoryReceiptDetailRepository.delete(id);
  }
}
