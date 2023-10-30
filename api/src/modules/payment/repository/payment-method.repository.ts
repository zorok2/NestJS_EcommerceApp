import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/entities/product/payment-method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentRepo: Repository<PaymentMethod>,
  ) {}

  async create(PaymentMethod: PaymentMethod): Promise<PaymentMethod> {
    return await this.paymentRepo.save(PaymentMethod);
  }

  async findAll(): Promise<PaymentMethod[]> {
    return await this.paymentRepo.find();
  }

  async findOneById(id: string): Promise<PaymentMethod> {
    return await this.paymentRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    PaymentMethod: PaymentMethod,
  ): Promise<PaymentMethod> {
    await this.paymentRepo.update(id, PaymentMethod);
    return await this.paymentRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.paymentRepo.delete(id);
  }
}
