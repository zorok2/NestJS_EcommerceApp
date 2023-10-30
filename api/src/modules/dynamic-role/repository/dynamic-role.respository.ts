import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DynamicApiRole,
  HttpMethodEntity,
} from 'src/entities/api-role/dynamic-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DynamicApiRoleRepository {
  constructor(
    @InjectRepository(DynamicApiRole)
    private readonly dynamicApiRoleRepository: Repository<DynamicApiRole>,
  ) {}

  async findAll(): Promise<DynamicApiRole[]> {
    return this.dynamicApiRoleRepository.find();
  }

  async findById(id: string): Promise<DynamicApiRole> {
    return this.dynamicApiRoleRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(dynamicApiRole: DynamicApiRole): Promise<DynamicApiRole> {
    return this.dynamicApiRoleRepository.save(dynamicApiRole);
  }

  async update(dynamicApiRole: DynamicApiRole): Promise<DynamicApiRole> {
    return this.dynamicApiRoleRepository.save(dynamicApiRole);
  }

  async delete(id: string): Promise<void> {
    await this.dynamicApiRoleRepository.delete(id);
  }

  // type: Admin,
  async findByType(
    type: string,
    method: HttpMethodEntity,
  ): Promise<DynamicApiRole[]> {
    return this.dynamicApiRoleRepository.query(
      `SELECT * FROM "dynamic-api-role" WHERE (roles @> '["${type}"]') and method = '${method}';`,
    );
  }

  async findAccessEndpoint(
    method: any,
    role: string,
    endpoint: string,
  ): Promise<DynamicApiRole[]> {
    const queryString = `
    SELECT * FROM "dynamic-api-role" 
    WHERE (roles @> '["${role}"]') and method = '${method}' and "apiEndpoint" = '${endpoint}';`;
    return this.dynamicApiRoleRepository.query(queryString);
  }
}
