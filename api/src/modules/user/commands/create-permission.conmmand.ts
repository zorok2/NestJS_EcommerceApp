import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../repositories/permission.repository';
import { PermissionModel } from '../models/permission.model';

export class CreatePermissionCommand {
  constructor(public readonly permissionName: string) {}
}

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionCommandHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute(command: CreatePermissionCommand): Promise<any> {
    const model = new PermissionModel(command.permissionName);
    return this.permissionRepository.createPermission(model.getEntity());
  }
}
