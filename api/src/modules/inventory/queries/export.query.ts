/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExportRepository } from '../repositories/export.repository';
import { InventoryExport } from 'src/entities/inventory/inventory-export.entity';

export class GetListExportQuery implements IQuery {
  constructor(public readonly page: number, public readonly pageSize: number) {}
}

@QueryHandler(GetListExportQuery)
export class GetListExportQueryHandler
  implements IQueryHandler<GetListExportQuery>
{
  private readonly logger = new Logger(GetListExportQueryHandler.name);

  constructor(private readonly exportRepository: ExportRepository) {}

  async execute(query: GetListExportQuery): Promise<InventoryExport[]> {
    const result = this.exportRepository.findAll(query.page, query.pageSize);
    return result;
  }
}

export class GetExportByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetExportByIdQuery)
export class GetExportByIdQueryHandler
  implements IQueryHandler<GetExportByIdQuery>
{
  private readonly logger = new Logger(GetExportByIdQueryHandler.name);

  constructor(private readonly exportRepository: ExportRepository) {}

  async execute(query: GetExportByIdQuery): Promise<InventoryExport> {
    const result = this.exportRepository.findOne(query.id);
    this.logger.debug('result get Export' + result);
    return result;
  }
}
