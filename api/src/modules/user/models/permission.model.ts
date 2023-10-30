import { Permission } from 'src/entities/user/user.entity';
import { v4 } from 'uuid';

export class PermissionModel {
  permissionEntity: Permission;
  constructor(name: string) {
    this.permissionEntity = new Permission();
    this.permissionEntity.id = v4();
    this.permissionEntity.isAvailable = true;
    this.permissionEntity.name = name;
  }

  getEntity = () => {
    return this.permissionEntity;
  };
}
