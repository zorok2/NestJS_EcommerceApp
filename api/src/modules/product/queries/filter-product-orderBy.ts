import { Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../repositories/product.repository';

export class FilterProductOrderByPrice implements IQuery {
  constructor(public readonly orderByName?: string, public readonly category?: string) {}
}

@QueryHandler(FilterProductOrderByPrice)
export class FilterProductOrderByPriceHandler
  implements IQueryHandler<FilterProductOrderByPrice>
{
  public readonly logger = new Logger(FilterProductOrderByPriceHandler.name);
  constructor(private readonly productRepository: ProductRepository) {}
  execute(query: FilterProductOrderByPrice): Promise<any> {
    return this.productRepository.getListProductOrderByPrice(query.orderByName, query.category);
  }
}
