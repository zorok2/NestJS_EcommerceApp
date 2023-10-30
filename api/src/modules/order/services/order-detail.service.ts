/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { GetDetailByOrderIdQuery } from '../queries/order-detail.query';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  private readonly logger = new Logger(OrderDetailService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async getDetailByOrderId(orderId: string): Promise<ResponseBase> {
    try {
      const user = await this.queryBus.execute(
        new GetDetailByOrderIdQuery(orderId),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Create User Successfully!',
        user,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
