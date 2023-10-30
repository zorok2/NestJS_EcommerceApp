/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CartRepository } from '../ repository/cart.repository';
import { RemoveProductFromCartDto } from '../dto/add-product.dto';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { Cart } from 'src/entities/product/cart.entity';
import { Logger } from '@nestjs/common';

export class RemoveProductFromCartCommand {
  constructor(
    public readonly userId: string,
    public readonly productIdList: RemoveProductFromCartDto,
  ) {}
}
@CommandHandler(RemoveProductFromCartCommand)
export class RemoveProductFromCartCommandHandler
  implements ICommandHandler<RemoveProductFromCartCommand>
{
  private readonly logger = new Logger(
    RemoveProductFromCartCommandHandler.name,
  );

  constructor(private readonly cartRepository: CartRepository) {}

  async execute(command: RemoveProductFromCartCommand): Promise<Cart[]> {
    try {
      const userCart = await this.cartRepository.getCartByUserId(
        command.userId,
      );

      const isNotExistCartOfUser = userCart.length === 0;

      if (isNotExistCartOfUser) {
        return Promise.reject(new Error('Cart not found'));
      }

      const productsToAdd = command.productIdList.products;

      for (let i = 0; i < productsToAdd.length; i++) {
        const productExistInCart = userCart.find(
          (cartDetail) =>
            cartDetail.products.productId === productsToAdd.at(i).productId,
        );

        if (!productExistInCart) {
          return Promise.reject(
            new Error(`Product ${productsToAdd.at(i).productId} not found`),
          );
        }

        productExistInCart.quantity -= +productsToAdd.at(i).quantity;

        if (productExistInCart.quantity <= 0) {
          await this.cartRepository.deleteById(productExistInCart.id);
        } else {
          await this.cartRepository.update(productExistInCart);
        }
      }
      return this.cartRepository.getCartByUserId(command.userId);
    } catch (error) {
      this.logger.error(error);
      return Promise.reject(new Error(error.message));
    }
  }
}

export class RemoveCartCommand {
  constructor(public readonly productIdList: RemoveProductFromCartDto) {}
}
@CommandHandler(RemoveCartCommand)
export class RemoveCartCommandHandler
  implements ICommandHandler<RemoveCartCommand>
{
  private readonly logger = new Logger(RemoveCartCommandHandler.name);

  constructor(private readonly cartRepository: CartRepository) {}

  async execute(command: RemoveProductFromCartCommand): Promise<Cart[]> {
    return this.cartRepository.deleteCartById(
      command.productIdList.userId,
      command.productIdList.products[0].productId,
    );
  }
}
