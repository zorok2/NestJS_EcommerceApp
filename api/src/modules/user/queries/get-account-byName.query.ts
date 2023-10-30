import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../repositories/user.repository';

export class GetAccountByNameQuery {
  constructor(public readonly accountName: string) {}
}

@QueryHandler(GetAccountByNameQuery)
export class GetAccountByNameQueryHandler
  implements IQueryHandler<GetAccountByNameQuery>
{
  constructor(private readonly repo: UserRepository) {}

  async execute(query: GetAccountByNameQuery): Promise<any> {
    return this.repo.findByUserName(query.accountName);
  }
}
