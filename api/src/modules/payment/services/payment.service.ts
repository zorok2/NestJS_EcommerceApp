/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus, ResponseBase } from 'src/shared/payload/response-base';
import { GetPaymentListQuery } from '../query/payment.query';

@Injectable()
export class PaymentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  private readonly logger = new Logger(PaymentService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async getList(): Promise<ResponseBase> {
    try {
      const payment = await this.queryBus.execute(
        new GetPaymentListQuery(),
      );
      if (!payment) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Payment List is empty',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Payment retrieved successfully',
        payment,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
