import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../repositories/permission.repository';

export class InvalidPermissionCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(InvalidPermissionCommand)
export class InvalidPermissionCommandHandler
  implements ICommandHandler<InvalidPermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute(command: InvalidPermissionCommand): Promise<any> {
    const permisisonStored = await this.permissionRepository.findById(
      command.id,
    );

    if (!permisisonStored) {
      return Promise.reject(
        new Error(`Permission id: ${command.id} not found`),
      );
    }

    permisisonStored.isAvailable = false;

    return this.permissionRepository.updatePermission(permisisonStored);
  }
}
