/* eslint-disable prettier/prettier */
import { Logger, Controller } from '@nestjs/common';
import { EventBus, IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../repositories/product.repository';

export class GetProductQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  public readonly logger = new Logger(GetProductQueryHandler.name);

  constructor(
    public readonly productRepository: ProductRepository,
    public readonly evenBus: EventBus,
  ) {}

  async execute(query: GetProductQuery): Promise<any> {
    const product = this.productRepository.getProductId(query.id);
    return product;
  }
}

export class GetProductByCategoryQuery implements IQuery {
  constructor(
    public readonly categoryName: string,
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}

@QueryHandler(GetProductByCategoryQuery)
export class GetProductByCategoryQueryHandler
  implements IQueryHandler<GetProductByCategoryQuery>
{
  public readonly logger = new Logger(GetProductByCategoryQueryHandler.name);

  constructor(
    public readonly productRepository: ProductRepository,
    public readonly evenBus: EventBus,
  ) {}

  async execute(query: GetProductByCategoryQuery): Promise<any> {
    const product = this.productRepository.getProductByCategory(
      query.categoryName,
      query.page,
      query.pageSize,
    );
    return product;
  }
}
