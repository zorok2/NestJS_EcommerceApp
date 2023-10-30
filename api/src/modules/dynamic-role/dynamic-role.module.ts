import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicApiRole } from 'src/entities/api-role/dynamic-role.entity';
import { CommandHandlers } from './commands/ index';
import { QueryHandlers } from './queries';
import { DynamicApiRoleController } from './controller/dynamic-role.controller';
import { DynamicApiRoleRepository } from './repository/dynamic-role.respository';
import { DynamicApiRoleService } from './services/dynamic-role.service';
import { UserModule } from '../user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    UserModule,
    CqrsModule,
    CacheModule.register(),
    TypeOrmModule.forFeature([DynamicApiRole]),
  ],
  controllers: [DynamicApiRoleController],
  providers: [
    DynamicApiRoleService,
    DynamicApiRoleRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [DynamicApiRoleService],
})
export class DynamicRoleModule {}
