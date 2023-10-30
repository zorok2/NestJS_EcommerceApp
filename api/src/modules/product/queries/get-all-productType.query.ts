import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductType } from 'src/entities/product/product-type.entity';
import { ProductTypeRepository } from '../repositories/product-type.repository';
import { Product } from 'src/entities/product/product.entity';

export class GetAllProductTypeQuery implements IQuery {
  constructor() {}
}

@QueryHandler(GetAllProductTypeQuery)
export class GetAllProductTypeQueryHandler
  implements IQueryHandler<GetAllProductTypeQuery>
{
  constructor(private readonly repository: ProductTypeRepository) {}

  execute(query: any): Promise<ProductType[]> {
    return this.repository.getProductTypes();
  }
}

export class GetAllProductTypeByIdQuery implements IQuery {
  constructor(public id: string) {}
}

@QueryHandler(GetAllProductTypeByIdQuery)
export class GetAllProductTypeByIdQueryHandler
  implements IQueryHandler<GetAllProductTypeByIdQuery>
{
  constructor(private readonly repository: ProductTypeRepository) {}

  execute(query: GetAllProductTypeByIdQuery): Promise<ProductType> {
    return this.repository.getProductTypeById(query.id);
  }
}
