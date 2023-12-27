/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import {
  GetAllOrderQuery,
  GetOrderByIdAndStatusQuery,
  GetOrderByIdQuery,
} from '../queries/order.query';
import { UpdateOrderStatusCommand } from '../commands/update-order-status.command';
import { CreateOrderCommand } from '../commands/create-order.command';
import { UpdateOrderDto } from '../dto/update-order-status.dto';
import { MapProxy } from 'src/lib/proxy/map/map.proxy';
import { CreateOrderDto, UpdateStatusDto } from '../dto/create-order.dto';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly mapProxy: MapProxy,
    private readonly inventoryService: InventoryService, // private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(OrderService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async getList(): Promise<ResponseBase> {
    try {
      const user = await this.queryBus.execute(new GetAllOrderQuery());
      return new ResponseBase(
        ResponseStatus.Success,
        'Get List Order Successfully!',
        user,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getOrderByUserId(userId: string): Promise<ResponseBase> {
    try {
      const user = await this.queryBus.execute(new GetOrderByIdQuery(userId));
      return new ResponseBase(
        ResponseStatus.Success,
        'Create User Successfully!',
        user,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  createOrder(order: CreateOrderDto): Promise<any> {
    return this.commandBus.execute(new CreateOrderCommand(order));
  }

  updateStatusOrder(updateStatusOrder: UpdateStatusDto) {
    try {
      const message = this.commandBus.execute(
        new UpdateOrderStatusCommand(
          updateStatusOrder.orderId,
          updateStatusOrder.status,
        ),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Update Status Successfully!',
        message,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
  testFilterException() {
    try {
      return new HttpException(
        `The product is out of stock`,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {}
  }

  async getOrderByUserIdAndStatus(
    userId: string,
    status: string,
  ): Promise<ResponseBase> {
    try {
      const user = await this.queryBus.execute(
        new GetOrderByIdAndStatusQuery(userId, status),
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
