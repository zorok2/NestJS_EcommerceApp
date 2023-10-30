/* eslint-disable prettier/prettier */
import { AddProductToCartCommandHandler } from './add-product-to-cart.command';
import {
  RemoveCartCommandHandler,
  RemoveProductFromCartCommandHandler,
} from './remove-product-from-cart.command';

export const Commands = [
  AddProductToCartCommandHandler,
  RemoveProductFromCartCommandHandler,
  RemoveCartCommandHandler,
];
