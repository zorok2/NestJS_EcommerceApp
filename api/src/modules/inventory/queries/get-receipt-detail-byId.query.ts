import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReceiptDetailsRepository } from '../repositories/receipt-detail.repository';

export class GetReceiptDetailByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetReceiptDetailByIdQuery)
export class GetReceiptDetailByIdQueryHandler
  implements IQueryHandler<GetReceiptDetailByIdQuery>
{
  constructor(private repo: ReceiptDetailsRepository) {}
  execute(query: GetReceiptDetailByIdQuery): Promise<any> {
    return this.repo.findById(query.id);
  }
}
