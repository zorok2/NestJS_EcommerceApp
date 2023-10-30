import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReceiptRepository } from '../repositories/receipt.repository';
import { InventoryReceipt } from 'src/entities/inventory/inventory-receipt.entity';

export class GetReceiptByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetReceiptByIdQuery)
export class GetReceiptByIdQueryHandler
  implements IQueryHandler<GetReceiptByIdQuery>
{
  constructor(private readonly receiptRepository: ReceiptRepository) {}
  execute(query: GetReceiptByIdQuery): Promise<InventoryReceipt> {
    return this.receiptRepository.findOne(query.id);
  }
}
