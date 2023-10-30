/* eslint-disable prettier/prettier */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PaymentMethodRepository } from '../repository/payment-method.repository';
import { PaymentMethod } from 'src/entities/product/payment-method.entity';

export class GetPaymentListQuery {}

@QueryHandler(GetPaymentListQuery)
export class GetPaymentListQueryHandler
  implements IQueryHandler<GetPaymentListQuery>
{
  constructor(private readonly paymentRepo: PaymentMethodRepository) {}

  async execute(): Promise<PaymentMethod[]> {
    return this.paymentRepo.findAll();
  }
}
