import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../repositories/permission.repository';

export class GetAllPermissionQuery {}

@QueryHandler(GetAllPermissionQuery)
export class GetAllPermissionQueryHandler
  implements IQueryHandler<GetAllPermissionQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute(): Promise<any> {
    return await this.permissionRepository.findAll();
  }
}
