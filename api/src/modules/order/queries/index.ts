/* eslint-disable prettier/prettier */

import { GetDetailByOrderIdQueryHandler } from './order-detail.query';
import {
  GetAllOrderQueryHandler,
  GetOrderByIdAndStatusHandler,
  GetOrderByIdQueryHandler,
} from './order.query';

export const orderQuerryHandlers = [
  GetAllOrderQueryHandler,
  GetOrderByIdQueryHandler,
  GetOrderByIdAndStatusHandler,
  GetDetailByOrderIdQueryHandler,
];
