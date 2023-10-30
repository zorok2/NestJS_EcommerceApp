/* eslint-disable prettier/prettier */
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReceiptRepository } from '../repositories/receipt.repository';
import { InventoryReceipt } from 'src/entities/inventory/inventory-receipt.entity';

export class GetAllReceiptQuery implements IQuery {
  constructor() {}
}

@QueryHandler(GetAllReceiptQuery)
export class GetAllReceiptQueryHandler
  implements IQueryHandler<GetAllReceiptQuery>
{
  constructor(private readonly receiptRepository: ReceiptRepository) {}
  execute(query: GetAllReceiptQuery): Promise<InventoryReceipt[]> {
    return this.receiptRepository.findAll();
  }
}
