import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateDynamicApiRoleCommand } from '../commands/create-dynamic-role.command';
import { CreateApiRoleDto } from '../dto/request/add-api-role.dto';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { GetAllApiRoleQuery } from '../queries/get-all-api-role.query';
import { Request } from 'express';
import { UserMetadata } from 'src/lib/middlewares/ middlewares.variable';
import { GetPublicEndpointQuery } from '../queries/get-access-endpoint.query';
import { DynamicApiRole } from 'src/entities/api-role/dynamic-role.entity';
import { GetSpecificAccessApiQuery } from '../queries/get-specific-access.query';
import { DeleteAccessApiEndpointCommand } from '../commands/remove-access-endpoint.command';

@Injectable()
export class DynamicApiRoleService {
  private readonly logger = new Logger(DynamicApiRoleService.name);
  private readonly DYNAMIC_ROLE_CACHE_KEY = 'DYNAMIC_ROLE_CACHE_KEY';
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

  async create(apiRolesDto: CreateApiRoleDto[]) {
    try {
      const commandResult = await this.commandBus.execute(
        new CreateDynamicApiRoleCommand(apiRolesDto),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Create role user for api success',
        commandResult,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async findAll() {
    try {
      const queryResult = await this.queryBus.execute(new GetAllApiRoleQuery());

      return this.createResponseBase(
        ResponseStatus.Success,
        'Get roles user for api success',
        queryResult,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async delete(id: string) {
    try {
      const queryResult = await this.commandBus.execute(
        new DeleteAccessApiEndpointCommand(id),
      );

      return this.createResponseBase(
        ResponseStatus.Success,
        'Delete access api success',
        queryResult,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async canAccessEndpoint(req: Request, userMetadata: UserMetadata) {
    this.logger.debug(req.method);
    this.logger.debug(req.url);
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/'));
    if (baseUrl.at(baseUrl.length - 1) === '/') {
      baseUrl = baseUrl.slice(0, -1);
    }
    this.logger.debug(baseUrl);
    const queryResult = (await this.queryBus.execute(
      new GetSpecificAccessApiQuery(
        req.method,
        userMetadata.permissionName,
        baseUrl,
      ),
    )) as DynamicApiRole[];
    this.logger.debug(JSON.stringify(queryResult));
    if (queryResult.length !== 0) {
      return true;
    }
    return false;
  }

  async isPublicEndpoint(req: Request) {
    const queryResult = (await this.queryBus.execute(
      new GetPublicEndpointQuery(req.method),
    )) as DynamicApiRole[];

    this.logger.debug(JSON.stringify(queryResult));

    for (let i = 0; i < queryResult.length; i++) {
      if (
        queryResult[i].apiEndpoint.includes(req.url) ||
        req.url.includes(queryResult[i].apiEndpoint)
      ) {
        return true;
      }
    }
    return false;
  }
}
