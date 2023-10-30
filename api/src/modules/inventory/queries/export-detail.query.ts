/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExportDetailRepository } from '../repositories/export-detail.repository';
import { InventoryExportDetail } from 'src/entities/inventory/inventory-export-detail.entity';

/* eslint-disable prettier/prettier */
export class GetExportDetailQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetExportDetailQuery)
export class GetExportDetailQueryHandler
  implements IQueryHandler<GetExportDetailQuery>
{
  private readonly logger = new Logger(GetExportDetailQueryHandler.name);

  constructor(
    private readonly exportDetailRepository: ExportDetailRepository,
  ) {}

  async execute(query: GetExportDetailQuery): Promise<InventoryExportDetail[]> {
    const result = await this.exportDetailRepository.findByExportId(query.id);
    return result;
  }
}

export class GetExportDetailToPrintQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetExportDetailToPrintQuery)
export class GetExportDetailToPrintQueryHandler
  implements IQueryHandler<GetExportDetailToPrintQuery>
{
  private readonly logger = new Logger(GetExportDetailToPrintQueryHandler.name);

  constructor(
    private readonly exportDetailRepository: ExportDetailRepository,
  ) {}

  async execute(
    query: GetExportDetailToPrintQuery,
  ): Promise<InventoryExportDetail[]> {
    const result = this.exportDetailRepository.findByExportIdToPrint(query.id);
    return result;
  }
}
