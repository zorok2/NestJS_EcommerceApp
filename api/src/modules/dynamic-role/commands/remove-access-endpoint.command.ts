import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DynamicApiRoleRepository } from '../repository/dynamic-role.respository';
import { PermissionRepository } from 'src/modules/user/repositories/permission.repository';

export class DeleteAccessApiEndpointCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteAccessApiEndpointCommand)
export class DeleteAccessApiEndpointCommandHandler
  implements ICommandHandler<DeleteAccessApiEndpointCommand>
{
  private logger = new Logger(DeleteAccessApiEndpointCommandHandler.name);
  constructor(
    private readonly dynamicRoleRepository: DynamicApiRoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}
  async execute(command: DeleteAccessApiEndpointCommand): Promise<any> {
    return await this.dynamicRoleRepository.delete(command.id);
  }
}
