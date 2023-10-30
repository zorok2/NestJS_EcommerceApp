/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrderRepository } from '../repositories/order.repository';

//Get All Order

export class GetAllOrderQuery implements IQuery {}

@QueryHandler(GetAllOrderQuery)
export class GetAllOrderQueryHandler
  implements IQueryHandler<GetAllOrderQuery>
{
  private readonly logger = new Logger(GetAllOrderQueryHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<any> {
    const result = this.orderRepository.findAll();
    return result;
  }
}

//Get Order By User Id

export class GetOrderByIdQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdQueryHandler
  implements IQueryHandler<GetOrderByIdQuery>
{
  private readonly logger = new Logger(GetOrderByIdQueryHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderByIdQuery): Promise<any[]> {
    const result = this.orderRepository.findByUserId(query.userId);
    return result;
  }
}

//Get Order By User Id and status

export class GetOrderByIdAndStatusQuery implements IQuery {
  constructor(public readonly userId: string, public readonly status: string) {}
}

@QueryHandler(GetOrderByIdAndStatusQuery)
export class GetOrderByIdAndStatusHandler
  implements IQueryHandler<GetOrderByIdAndStatusQuery>
{
  private readonly logger = new Logger(GetOrderByIdAndStatusHandler.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderByIdAndStatusQuery): Promise<any> {
    const result = this.orderRepository.findByStatus(
      query.userId,
      query.status,
    );
    return result;
  }
}
