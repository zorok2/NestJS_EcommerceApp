/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductService } from '../product.service';
import {
  GetListProviderQuery,
  GetProviderByIdQuery,
  GetProviderByNameQuery,
} from '../queries/provider.query';
import {
  CreateProviderCommand,
  UpdateProviderCommand,
} from '../commands/provider.command';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { Provider } from 'src/entities/product/provider.entity';
import { CreateProviderDto } from '../dto/request/create-provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  private readonly logger = new Logger(ProductService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async findAll(): Promise<ResponseBase> {
    try {
      const provider = await this.queryBus.execute(
        new GetListProviderQuery(),
      );
      if (!provider) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Provider List is empty',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Provider retrieved successfully',
        provider,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async findById(id: string): Promise<ResponseBase> {
    try {
      const provider = await this.queryBus.execute(
        new GetProviderByIdQuery(id),
      );
      if (!provider) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Provider not found',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Provider retrieved successfully',
        provider,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
  async createProvider(provider: CreateProviderDto): Promise<ResponseBase> {
    try {
      const createdProvider = await this.commandBus.execute(
        new CreateProviderCommand(provider),
      );
      if (!createdProvider) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Create Provider fail',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Provider created successfully',
        createdProvider,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async findByName(
    name: string,
    // page: number,
    // pageSize: number,
  ): Promise<ResponseBase> {
    try {
      const provider = await this.queryBus.execute(
        new GetProviderByNameQuery(name),
      );
      if (!provider) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Provider not found',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Provider retrieved successfully',
        provider,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async updateProvider(provider: Provider): Promise<ResponseBase> {
    try {
      const updatedProvider = await this.commandBus.execute(
        new UpdateProviderCommand(provider),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Provider updated successfully',
        updatedProvider,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
