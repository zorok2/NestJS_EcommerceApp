/* eslint-disable prettier/prettier */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Category } from '../../../entities/product/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

export class GetCategoryByIdQuery {
  constructor(public readonly categoryId: string) {}
}

@QueryHandler(GetCategoryByIdQuery)
export class GetCategoryByIdQueryHandler
  implements IQueryHandler<GetCategoryByIdQuery>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: GetCategoryByIdQuery): Promise<Category> {
    return this.categoryRepository.findById(query.categoryId);
  }
}

export class GetCategoryByNameQuery {
  constructor(public readonly categoryName: string) {}
}

@QueryHandler(GetCategoryByNameQuery)
export class GetCategoryByNameQueryHandler
  implements IQueryHandler<GetCategoryByNameQuery>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(query: GetCategoryByNameQuery): Promise<Category> {
    return this.categoryRepository.findByName(query.categoryName);
  }
}

export class GetAllCategoryQuery {}

@QueryHandler(GetAllCategoryQuery)
export class GetAllCategoryQueryQueryHandler
  implements IQueryHandler<GetAllCategoryQuery>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }
}
