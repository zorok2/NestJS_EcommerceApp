/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { EventBus, IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../repositories/product.repository';

export class GetListProductQuery implements IQuery {
  constructor(public readonly page: number, public readonly pageSize: number) {}
}

@QueryHandler(GetListProductQuery)
export class GetListProductQueryHandler
  implements IQueryHandler<GetListProductQuery>
{
  private readonly logger = new Logger(GetListProductQueryHandler.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetListProductQuery): Promise<any> {
    const result = this.productRepository.GetListProductQuery(
      query.page,
      query.pageSize,
    );
    return result;
  }
}
