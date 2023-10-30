/* eslint-disable prettier/prettier */
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../repositories/user.repository';
import { User } from 'src/entities/user/user.entity';
import { Logger } from '@nestjs/common';

export class FindUserLoginQuery implements IQuery {
  constructor(public readonly username: string) {}
}

@QueryHandler(FindUserLoginQuery)
export class FindUserLoginQueryHandler
  implements IQueryHandler<FindUserLoginQuery>
{
  private readonly logger = new Logger(FindUserLoginQueryHandler.name);
  constructor(private readonly userRepository: UserRepository) {}
  execute(query: FindUserLoginQuery): Promise<User> {
    this.logger.debug('find user');
    return this.userRepository.login(query.username);
  }
}
