/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { OrderDetailService } from '../services/order-detail.service';
import { OrderController } from './order.controller';

@Controller('order/detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}
  private readonly logger = new Logger(OrderController.name);

  //TODO Query
  //Get Detail By Order Id
  @Get(':id')
  async getDetailByOrderId(@Param('id') orderId: string) {
    const user = await this.orderDetailService.getDetailByOrderId(orderId);
    return user;
  }
}
