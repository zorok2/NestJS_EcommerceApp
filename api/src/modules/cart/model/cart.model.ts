import { Product } from 'src/entities/product/product.entity';
import { AddProductRequest } from '../dto/add-product.dto';
import { Cart } from 'src/entities/product/cart.entity';
import { v4 as uuidv4 } from 'uuid';

export class CartModel {
  cartEntity: Cart;
  constructor(
    productStored: Product,
    productDto: AddProductRequest,
    userId: string,
  ) {
    this.cartEntity = new Cart();
    this.cartEntity.id = uuidv4();
    this.cartEntity.discount = 0;
    this.cartEntity.products = productStored;
    this.cartEntity.quantity = productDto.quantity;
    this.cartEntity.userId = userId;
  }

  getCartEntityToStore = () => {
    return this.cartEntity;
  };
}
