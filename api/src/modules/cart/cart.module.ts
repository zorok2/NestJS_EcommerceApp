/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../../entities/product/cart.entity';
import { Repositories } from './ repository';
import { Services } from './services';
import { CartController } from './cart.controller';
import { Commands } from './commands';
import { ProductModule } from '../product/product.module';
import { Queries } from './queries';

@Module({
  imports: [ProductModule, CqrsModule, TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [...Services, ...Repositories, ...Commands, ...Queries],
  exports: [],
})
export class CartModule {}
