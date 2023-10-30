/* eslint-disable prettier/prettier */
import { CreateOrderCommandHandler } from './create-order.command';
import { UpdateOrderStatusCommandHandler } from './update-order-status.command';

export const orderCommandHandlers = [
  CreateOrderCommandHandler,
  UpdateOrderStatusCommandHandler,
];
