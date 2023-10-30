import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DynamicApiRoleRepository } from '../repository/dynamic-role.respository';
import { DynamicApiRoleModel } from '../model/dynamic-role.model';
import { CreateApiRoleDto } from '../dto/request/add-api-role.dto';
import { Logger } from '@nestjs/common';
import { DynamicApiRole } from 'src/entities/api-role/dynamic-role.entity';
import { PermissionRepository } from 'src/modules/user/repositories/permission.repository';
import { Permission } from 'src/entities/user/user.entity';

export class CreateDynamicApiRoleCommand {
  constructor(public readonly listRoleDto: CreateApiRoleDto[]) {}
}

@CommandHandler(CreateDynamicApiRoleCommand)
export class CreateDynamicApiRoleHandler
  implements ICommandHandler<CreateDynamicApiRoleCommand>
{
  private logger = new Logger(CreateDynamicApiRoleHandler.name);
  constructor(
    private readonly dynamicRoleRepository: DynamicApiRoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  private getPermissionStored = async (endpointAndRole: CreateApiRoleDto) => {
    const roleId = endpointAndRole.rolesId.at(0);
    if (!roleId) {
      throw new Error(`Permission id missing at request!`);
    }

    const permissionStored = await this.permissionRepository.findById(roleId);

    if (!permissionStored) {
      throw new Error(
        `Permission with id: ${endpointAndRole.rolesId.at(0)} not found`,
      );
    }
    return permissionStored;
  };

  private getDynamicRoleEndpointStored = async (
    endpointAndRole: CreateApiRoleDto,
    permissionStored: Permission,
  ) => {
    return await this.dynamicRoleRepository.findAccessEndpoint(
      endpointAndRole.method,
      permissionStored.name,
      endpointAndRole.apiEndpoint,
    );
  };

  async execute(
    command: CreateDynamicApiRoleCommand,
  ): Promise<DynamicApiRole[]> {
    const model = new DynamicApiRoleModel();
    try {
      const createResult = await Promise.all(
        command.listRoleDto?.map(async (endpointAndRole) => {
          const permission = await this.getPermissionStored(endpointAndRole);

          const dynamicRoleStored = await this.getDynamicRoleEndpointStored(
            endpointAndRole,
            permission,
          );

          if (dynamicRoleStored.length === 0) {
            endpointAndRole.rolesId = [permission.name];
            return await this.dynamicRoleRepository.create(
              model.getEntity(endpointAndRole),
            );
          }
        }),
      );
      return Promise.resolve(createResult);
    } catch (error) {
      this.logger.error(error.message);
      return Promise.reject(error.message);
    }
  }
}
