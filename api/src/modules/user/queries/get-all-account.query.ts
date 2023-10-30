import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';
import { UserRepository } from '../repositories/user.repository';
import { Logger } from '@nestjs/common';

export class GetAllAccountQuery implements IQuery {}

@QueryHandler(GetAllAccountQuery)
export class GetAllAccountQueryHandler
  implements IQueryHandler<GetAllAccountQuery>
{
  private readonly logger = new Logger(GetAllAccountQueryHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<any> {
    this.logger.log('get all account log');
    const result = await this.userRepository.findAll();
    return result;
  }
}
