/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { OrderDetailService } from './order-detail.service';
import { OrderService } from './order.service';

export const orderServices = [OrderService, OrderDetailService];
