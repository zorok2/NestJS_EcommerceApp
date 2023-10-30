import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../commands/create-permission.conmmand';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { GetAllPermissionQuery } from '../queries/get-all-permission.command';
import { GetOnePermissionQuery } from '../queries/get-one-permission.command';
import { CreatePermissonDto } from '../dto/request/create-permission.dto';
import { InvalidPermissionCommand } from '../commands/invalid-permission.command';
import { ActivePermissionCommand } from '../commands/active-permission.command';

@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async create(createPermissonDto: CreatePermissonDto) {
    try {
      const commandResult = await this.commandBus.execute(
        new CreatePermissionCommand(createPermissonDto.name),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Create permission Success',
        commandResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getAllPermission() {
    try {
      const queryResult = await this.queryBus.execute(
        new GetAllPermissionQuery(),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get permission success',
        queryResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getPermissionById(id: string) {
    try {
      const queryResult = await this.queryBus.execute(
        new GetOnePermissionQuery(id),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get permission success',
        queryResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async invalidPermissionById(id: string) {
    try {
      const commandResult = await this.commandBus.execute(
        new InvalidPermissionCommand(id),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Invalid permission success',
        commandResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async activePermissionById(id: string) {
    try {
      const commandResult = await this.commandBus.execute(
        new ActivePermissionCommand(id),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Active permission success',
        commandResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
