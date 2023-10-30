import { Logger } from '@nestjs/common';
import { IQuery, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { DynamicApiRoleRepository } from '../repository/dynamic-role.respository';
import { DynamicApiRole } from 'src/entities/api-role/dynamic-role.entity';

export class GetAllApiRoleQuery implements IQuery {}

@QueryHandler(GetAllApiRoleQuery)
export class GetAllApiRoleQueryHandler
  implements IQueryHandler<GetAllApiRoleQuery>
{
  private readonly logger = new Logger(GetAllApiRoleQueryHandler.name);
  constructor(
    private readonly dynamicRoleRepository: DynamicApiRoleRepository,
  ) {}

  async execute(): Promise<DynamicApiRole[]> {
    const result = await this.dynamicRoleRepository.findAll();
    return result;
  }
}
