/* eslint-disable prettier/prettier */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CartRepository } from '../ repository/cart.repository';
import { Cart } from 'src/entities/product/cart.entity';

export class GetCartByUserIdQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetCartByUserIdQuery)
export class GetCartByUserIdQueryHandler
  implements IQueryHandler<GetCartByUserIdQuery>
{
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(query: GetCartByUserIdQuery): Promise<Cart[]> {
    const cart = await this.cartRepository.getCartByUserId(query.userId);
    // if (cart.length === 0) {
    //   return Promise.reject(new Error('Cart not found'));
    // }
    return Promise.resolve(cart);
  }
}
