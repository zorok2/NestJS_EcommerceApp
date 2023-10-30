import { CreateExportEventHandler } from './create-export.event';
import { UpdateCartEventHandler } from './update-cart.event';
import { UpdateQuantityStockEventHandler } from './update-quantity-product.event';

export const orderEventHandlers = [
  CreateExportEventHandler,
  UpdateQuantityStockEventHandler,
  UpdateCartEventHandler,
];
