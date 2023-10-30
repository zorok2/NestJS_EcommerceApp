/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CartRepository } from '../ repository/cart.repository';
import { AddProductToCartDto } from '../dto/add-product.dto';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { Cart } from 'src/entities/product/cart.entity';
import { Logger } from '@nestjs/common';
import { CartModel } from '../model/cart.model';

export class AddProductToCartCommand {
  constructor(
    public readonly userId: string,
    public readonly productIdList: AddProductToCartDto,
  ) {}
}
@CommandHandler(AddProductToCartCommand)
export class AddProductToCartCommandHandler
  implements ICommandHandler<AddProductToCartCommand>
{
  private readonly logger = new Logger(AddProductToCartCommandHandler.name);

  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  private handleCreateNewCartAndProduct = async (
    command: AddProductToCartCommand,
  ) => {
    const productsToAdd = command.productIdList.products;

    for (let i = 0; i < productsToAdd.length; i++) {
      const productStored = await this.productRepository.getProductId(
        productsToAdd.at(i).productId,
      );

      this.logger.debug(productStored);

      if (!productStored) {
        throw new Error(`Product ${productsToAdd.at(i).productId} not found!`);
      }

      const cartModel = new CartModel(
        productStored,
        productsToAdd.at(i),
        command.userId,
      );

      const cartCreated = await this.cartRepository.create(
        cartModel.getCartEntityToStore(),
      );

      this.logger.debug(JSON.stringify(cartCreated));
    }
  };

  private handleAddProductToCart = async (
    cartStored: Cart[],
    command: AddProductToCartCommand,
  ) => {
    const productsToAdd = command.productIdList.products;
    for (let i = 0; i < productsToAdd.length; i++) {
      const productExistInCart = cartStored.find(
        (cartDetail) =>
          cartDetail.products.productId === productsToAdd.at(i).productId,
      );

      if (productExistInCart) {
        productExistInCart.quantity += +productsToAdd.at(i).quantity;
        await this.cartRepository.update(productExistInCart);
      } else {
        const productStored = await this.productRepository.getProductId(
          productsToAdd.at(i).productId,
        );
        if (!productStored) {
          throw new Error(
            `Product ${productsToAdd.at(i).productId} not found!`,
          );
        }
        const cartModel = new CartModel(
          productStored,
          productsToAdd.at(i),
          command.userId,
        );
        await this.cartRepository.create(cartModel.getCartEntityToStore());
      }
    }
  };

  async execute(command: AddProductToCartCommand): Promise<Cart[]> {
    try {
      const userCart = await this.cartRepository.getCartByUserId(
        command.userId,
      );
      // Create new cart;
      this.logger.debug(JSON.stringify(userCart));

      const isNotExistCartOfUser = userCart.length === 0;
      if (isNotExistCartOfUser) {
        await this.handleCreateNewCartAndProduct(command);
      } else {
        await this.handleAddProductToCart(userCart, command);
      }

      return Promise.resolve(
        this.cartRepository.getCartByUserId(command.userId),
      );
    } catch (error) {
      this.logger.error(error);
      return Promise.reject(new Error(error.message));
    }
  }
}
