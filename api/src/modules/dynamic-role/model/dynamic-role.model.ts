import { DynamicApiRole } from 'src/entities/api-role/dynamic-role.entity';
import { CreateApiRoleDto } from '../dto/request/add-api-role.dto';
import { v4 } from 'uuid';
export class DynamicApiRoleModel {
  getEntity(createDto: CreateApiRoleDto): DynamicApiRole {
    const dynamicApiRoleEntity = new DynamicApiRole();
    dynamicApiRoleEntity.id = v4();
    dynamicApiRoleEntity.apiEndpoint = createDto.apiEndpoint;
    dynamicApiRoleEntity.roles = createDto.rolesId;
    dynamicApiRoleEntity.isActive = true;
    dynamicApiRoleEntity.service = createDto.service;
    dynamicApiRoleEntity.method = createDto.method;
    dynamicApiRoleEntity.description = createDto.description;
    dynamicApiRoleEntity.createdDate = new Date();
    dynamicApiRoleEntity.updatedDate = new Date();

    return dynamicApiRoleEntity;
  }
}
