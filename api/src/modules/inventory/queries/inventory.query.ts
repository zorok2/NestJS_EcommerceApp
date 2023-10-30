import { Logger } from '@nestjs/common';
import { IQuery, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InventoryRepository } from '../repositories/inventory.repository';

export class GetListInventoryQuery implements IQuery {}

@QueryHandler(GetListInventoryQuery)
export class GetListInventoryQueryHandler
  implements IQueryHandler<GetListInventoryQuery>
{
  private readonly logger = new Logger(GetListInventoryQueryHandler.name);

  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(): Promise<any> {
    return await this.inventoryRepository.findAll();
  }
}
