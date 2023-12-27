import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../repositories/user.repository';

export class GetUserByEmailQuery {
  constructor(public readonly email: string) {}
}

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
    constructor(private readonly userRepo: UserRepository){}
  execute(query: GetUserByEmailQuery): Promise<any> {
    return this.userRepo.findUserByEmail(query.email);
  }
}
