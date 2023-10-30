import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../repositories/permission.repository';

export class ActivePermissionCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(ActivePermissionCommand)
export class ActivePermissionCommandHandler
  implements ICommandHandler<ActivePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute(command: ActivePermissionCommand): Promise<any> {
    const permisisonStored = await this.permissionRepository.findById(
      command.id,
    );

    if (!permisisonStored) {
      return Promise.reject(
        new Error(`Permission id: ${command.id} not found`),
      );
    }

    permisisonStored.isAvailable = true;

    return this.permissionRepository.updatePermission(permisisonStored);
  }
}
