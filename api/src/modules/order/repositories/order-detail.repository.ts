/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/product/order-detail.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.find();
  }

  async findByOrderId(id: string): Promise<OrderDetail[]> {
    const options: FindOneOptions<OrderDetail> = {
      relations: { product: true, order: true },
      where: {
        order: { id: id },
      },
    };
    return this.orderDetailRepository.find(options);
  }

  async findBothOrderProduct(orderId, productId) {
    const options: FindOneOptions<OrderDetail> = {
      relations: { product: true, order: true },
      where: {
        order: { id: orderId },
        product: { productId: productId },
      },
    };
    return this.orderDetailRepository.find(options);
  }

  async create(orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailRepository.save(orderDetail);
  }

  async update(orderDetail: OrderDetail): Promise<OrderDetail> {
    return this.orderDetailRepository.save(orderDetail);
  }

  async deleteById(id: string): Promise<void> {
    await this.orderDetailRepository.delete(id);
  }
}
