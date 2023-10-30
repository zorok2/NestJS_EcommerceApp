import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from '../../entities/product/payment-method.entity';
import { PaymentMethodRepository } from './repository/payment-method.repository';
import { InventoryModule } from '../inventory/inventory.module';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { PaymentQueryHandlers } from './query';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentController],
  providers: [PaymentMethodRepository, PaymentService, ...PaymentQueryHandlers],
  exports: [PaymentMethodRepository, PaymentService],
})
export class PaymentModule {}
