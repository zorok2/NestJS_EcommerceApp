/* eslint-disable prettier/prettier */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Category } from '../../../entities/product/category.entity';
import { UserRepository } from '../repositories/user.repository';

export class GetAccountByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetAccountByIdQuery)
export class GetAccountByIdQueryHandler
  implements IQueryHandler<GetAccountByIdQuery>
{
  constructor(private readonly repo: UserRepository) {}

  async execute(query: GetAccountByIdQuery): Promise<any> {
    return this.repo.findById(query.id);
  }
}
