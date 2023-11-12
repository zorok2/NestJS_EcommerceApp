/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfig } from './lib/infrastructure/typeorm/postgres-typeorm.config';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { PaymentModule } from './modules/payment/payment.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProxyModule } from './lib/proxy/proxy.module';
import { UtilsModule } from './lib/utils/utils.module';
import { AutheticatedRequestMiddleware } from './lib/middlewares/auth.middleware';
import { DynamicRoleModule } from './modules/dynamic-role/dynamic-role.module';
import { AuthorizationRequestMiddleware } from './lib/middlewares/authorization.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './lib/configs/application.config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeOrmPostgresConfig,
    }),

    SharedModule,

    ProductModule,
    OrderModule,
    UserModule,
    CartModule,
    PaymentModule,
    InventoryModule,
    ProxyModule,
    UtilsModule,
    DynamicRoleModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply( AuthorizationRequestMiddleware)
    //   .forRoutes({
    //     path: '*',
    //     method: RequestMethod.ALL,
    //   });
  }
}
//implements NestModule
// export class AppModule {
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer
//   //     .apply(AutheticatedRequestMiddleware, AuthorizationRequestMiddleware)
//   //     .forRoutes({
//   //       path: '*',
//   //       method: RequestMethod.ALL,
//   //     });
//   // }
// }
