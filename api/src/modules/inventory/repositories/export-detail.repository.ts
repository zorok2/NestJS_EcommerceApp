import { InventoryExportDetail } from 'src/entities/inventory/inventory-export-detail.entity';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ExportDetailRepository {
  constructor(
    @InjectRepository(InventoryExportDetail)
    private inventoryExportDetailRepository: Repository<InventoryExportDetail>,
  ) {}

  async create(
    inventoryExportDetail: InventoryExportDetail,
  ): Promise<InventoryExportDetail> {
    return await this.inventoryExportDetailRepository.save(
      inventoryExportDetail,
    );
  }

  async findAll(): Promise<InventoryExportDetail[]> {
    return await this.inventoryExportDetailRepository.find();
  }

  async findOne(id: string): Promise<InventoryExportDetail> {
    const options: FindOneOptions<InventoryExportDetail> = {
      where: {
        id: id,
      },
    };
    return await this.inventoryExportDetailRepository.findOne(options);
  }

  async findByExportId(id: string): Promise<any[]> {
    const options = await this.inventoryExportDetailRepository.find({
      where: { inventoryExport: { inventoryExportId: id } },
      relations: {
        inventoryExport: true,
        product: true,
        provider: true,
      },
    });
    console.log('ketqua' + options);
    return options;
  }

  async findByExportIdToPrint(id: string): Promise<any[]> {
    const options = await this.inventoryExportDetailRepository.find({
      where: { inventoryExport: { inventoryExportId: id } },
      relations: { inventoryExport: true, product: true },
    });
    return options;
  }

  async update(
    id: string,
    inventoryExportDetail: InventoryExportDetail,
  ): Promise<InventoryExportDetail> {
    await this.inventoryExportDetailRepository.update(
      id,
      inventoryExportDetail,
    );
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.inventoryExportDetailRepository.delete(id);
  }
}
