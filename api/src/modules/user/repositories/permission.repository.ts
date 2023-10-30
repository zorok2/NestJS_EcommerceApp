/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/user/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findById(id: string): Promise<Permission> {
    const options: FindOneOptions<Permission> = {
      where: {
        id: id,
      },
    };
    return this.permissionRepository.findOne(options);
  }

  async findByName(name: string): Promise<Permission> {
    const options: FindOneOptions<Permission> = {
      where: {
        name: name,
      },
    };
    return this.permissionRepository.findOne(options);
  }

  async createPermission(permission: Permission): Promise<Permission> {
    return this.permissionRepository.save(permission);
  }

  async updatePermission(permission: Permission): Promise<Permission> {
    return this.permissionRepository.save(permission);
  }
}
