/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Cart } from 'src/entities/product/cart.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  async findById(id: string): Promise<Cart> {
    const options: FindOneOptions<Cart> = {
      where: {
        id: id,
      },
    };
    return this.cartRepository.findOne(options);
  }

  async create(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }

  async update(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }

  async deleteById(id: string): Promise<any> {
    await this.cartRepository.delete(id);
  }

  async deleteCartById(userId: string, productId: string): Promise<any> {
    const options: FindOneOptions<Cart> = {
      where: {
        user: { id: userId },
        products: { productId: productId },
      },
    };
    const cart = this.cartRepository.findOne(options);
    await this.cartRepository.delete((await cart).id);
    return await this.cartRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { products: true },
    });
  }

  async getCartByUserId(userId: string): Promise<Cart[]> {
    return await this.cartRepository.find({
      where: {
        user: { id: userId },
      },
      relations: { products: true },
    });
  }
}
