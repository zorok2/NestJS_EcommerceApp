/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { IQuery, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../repositories/order.repository';
import { OrderDetailRepository } from '../repositories/order-detail.repository';

export class GetDetailByOrderIdQuery implements IQuery {
  constructor(public readonly orderId: string) {}
}

@QueryHandler(GetDetailByOrderIdQuery)
export class GetDetailByOrderIdQueryHandler
  implements IQueryHandler<GetDetailByOrderIdQuery>
{
  private readonly logger = new Logger(GetDetailByOrderIdQueryHandler.name);

  constructor(private readonly orderDetailRepository: OrderDetailRepository) {}

  async execute(query: GetDetailByOrderIdQuery): Promise<any> {
    const result = await this.orderDetailRepository.findByOrderId(
      query.orderId,
    );
    return result;
  }
}
