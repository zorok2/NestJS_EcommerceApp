import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../repositories/permission.repository';

export class GetOnePermissionQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetOnePermissionQuery)
export class GetOnePermissionQueryHandler
  implements IQueryHandler<GetOnePermissionQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute(query: GetOnePermissionQuery): Promise<any> {
    return this.permissionRepository.findById(query.id);
  }
}
