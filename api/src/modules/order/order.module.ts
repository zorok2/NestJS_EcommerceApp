/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from '../../entities/product/order-detail.entity';
import { Order } from '../../entities/product/order.entity';
import { ProductRepository } from '../product/repositories/product.repository';
import { PaymentMethodRepository } from '../payment/repository/payment-method.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { PaymentModule } from '../payment/payment.module';
import { orderCommandHandlers } from './commands';
import { InventoryModule } from '../inventory/inventory.module';
import { orderEventHandlers } from './events';
import { orderQuerryHandlers } from './queries';
import { orderServices } from './services';
import { OrderRepositories } from './repositories';
import { orderControllers } from './controllers';
import { ProxyModule } from 'src/lib/proxy/proxy.module';
import { OrderDetailRepository } from './repositories/order-detail.repository';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => ProductModule),
    forwardRef(() => UserModule),

    PaymentModule,
    InventoryModule,
    ProxyModule,
    TypeOrmModule.forFeature([Order, OrderDetail]),
  ],
  controllers: [...orderControllers],
  providers: [
    ...orderEventHandlers,
    ...OrderRepositories,
    ...orderCommandHandlers,
    ...orderQuerryHandlers,
    ...orderServices,
  ],
  exports: [OrderDetailRepository],
})
export class OrderModule {}
