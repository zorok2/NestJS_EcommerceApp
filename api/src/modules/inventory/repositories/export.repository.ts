/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryExport } from '../../../entities/inventory/inventory-export.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateExportDto } from '../dto/request/create-export.dto';

@Injectable()
export class ExportRepository {
  constructor(
    @InjectRepository(InventoryExport)
    private inventoryExportRepository: Repository<InventoryExport>,
  ) { }

  async create(inventoryExport: InventoryExport): Promise<InventoryExport> {
    return await this.inventoryExportRepository.save(inventoryExport);
  }

  async findAll(page: number, pageSize: number): Promise<InventoryExport[]> {
    return await this.inventoryExportRepository.find({
      relations: { inventory: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async findOne(id: string): Promise<InventoryExport> {
    const options: FindOneOptions<InventoryExport> = {
      where: {
        inventoryExportId: id,
      },
      relations: { inventory: true },
    };
    return await this.inventoryExportRepository.findOne(options);
  }

  async update(
    id: string,
    inventoryExport: InventoryExport,
  ): Promise<InventoryExport> {
    await this.inventoryExportRepository.update(id, inventoryExport);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.inventoryExportRepository.delete(id);
  }
}
