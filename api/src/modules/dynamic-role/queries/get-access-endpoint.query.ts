import { Logger } from '@nestjs/common';
import { IQuery, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { DynamicApiRoleRepository } from '../repository/dynamic-role.respository';
import {
  DynamicApiRole,
  HttpMethodEntity,
} from 'src/entities/api-role/dynamic-role.entity';

export class GetPublicEndpointQuery implements IQuery {
  typeEnpoint = 'Public';
  constructor(public readonly method: any) {
    this.method = method as HttpMethodEntity;
  }
}

@QueryHandler(GetPublicEndpointQuery)
export class GetPublicEndpointQueryHandler
  implements IQueryHandler<GetPublicEndpointQuery>
{
  private readonly logger = new Logger(GetPublicEndpointQueryHandler.name);
  constructor(
    private readonly dynamicRoleRepository: DynamicApiRoleRepository,
  ) {}

  async execute(query: GetPublicEndpointQuery): Promise<DynamicApiRole[]> {
    return await this.dynamicRoleRepository.findByType(
      query.typeEnpoint,
      query.method,
    );
  }
}
