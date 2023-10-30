/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/product/order.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findById(id: string): Promise<Order> {
    const options: FindOneOptions<Order> = {
      where: {
        id: id,
      },
    };
    return this.orderRepository.findOne(options);
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async findByStatus(userId: string, status: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: {
        id: userId,
        status: status,
      },
    });
    return orders;
  }

  async create(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async update(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async deleteById(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
