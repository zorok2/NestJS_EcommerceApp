/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import {
  GetExportByIdQuery,
  GetListExportQuery,
} from '../queries/export.query';
import { CreateExportCommand } from '../commands/create-export.command';

@Injectable()
export class InventoryExportService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  private readonly logger = new Logger(InventoryExportService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async getList(page: number, pageSize: number) {
    try {
      const result = await this.queryBus.execute(
        new GetListExportQuery(+page, +pageSize),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get List InventoryExport',
        result,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getExportById(id: string): Promise<ResponseBase> {
    try {
      const result = await this.queryBus.execute(new GetExportByIdQuery(id));
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get InventoryExport By Id',
        result,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async createExport(data) {
    try {
      const exportData = await this.commandBus.execute(
        new CreateExportCommand(data),
      );
      return new ResponseBase(ResponseStatus.Success, 'Created', exportData);
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
