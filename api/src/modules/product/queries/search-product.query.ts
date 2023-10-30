/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { EventBus, IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from 'src/entities/product/product.entity';

export class SearchProductQuery implements IQuery {
  constructor(
    public readonly name: string,
    public readonly categoryId: string,
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}

@QueryHandler(SearchProductQuery)
export class SearchProductQueryHandler
  implements IQueryHandler<SearchProductQuery>
{
  private readonly logger = new Logger(SearchProductQueryHandler.name);
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly evenBus: EventBus,
  ) {}

  async execute(query: SearchProductQuery): Promise<Product[]> {
    const product = this.productRepository.getProductByName(
      query.name,
      query.categoryId,
      query.page,
      query.pageSize,
    );
    return product;
  }
}
