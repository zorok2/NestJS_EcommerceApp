import { Logger } from '@nestjs/common';
import { IQuery, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { DynamicApiRoleRepository } from '../repository/dynamic-role.respository';
import { DynamicApiRole } from 'src/entities/api-role/dynamic-role.entity';

export class GetSpecificAccessApiQuery implements IQuery {
  constructor(
    public readonly method: any,
    public readonly role: string,
    public readonly endpoint: string,
  ) {}
}

@QueryHandler(GetSpecificAccessApiQuery)
export class GetSpecificAccessApiQueryHandler
  implements IQueryHandler<GetSpecificAccessApiQuery>
{
  private readonly logger = new Logger(GetSpecificAccessApiQueryHandler.name);
  constructor(
    private readonly dynamicRoleRepository: DynamicApiRoleRepository,
  ) {}

  execute(query: GetSpecificAccessApiQuery): Promise<DynamicApiRole[]> {
    return this.dynamicRoleRepository.findAccessEndpoint(
      query.method,
      query.role,
      query.endpoint,
    );
  }
}
