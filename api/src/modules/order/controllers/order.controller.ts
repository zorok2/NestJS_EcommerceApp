/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import {
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  private readonly logger = new Logger(OrderController.name);

  //TODO Query
  //Get Order List
  @Get()
  async getAllOrder() {
    const orders = await this.orderService.getList();
    return orders;
  }

  //Get Order By User Id
  @Get('id/:id')
  async getOrderByUserId(@Param('id') userId: string) {
    const orders = await this.orderService.getOrderByUserId(userId);
    return orders;
  }

  //Get Order By User Id and Status
  @Get(':id')
  async getOrderByUserIdAndStatus(
    @Param('id') userId: string,
    @Query('status') status: string,
  ) {
    const orders = await this.orderService.getOrderByUserIdAndStatus(
      userId,
      status,
    );
    return orders;
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return this.orderService.createOrder(order);
  }
}
