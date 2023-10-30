/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PaymentMethod } from './payment-method.entity';
import { Product } from './product.entity';
import { OrderDetail } from './order-detail.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  discount: number;

  @Column()
  status: string;

  @Column()
  totalPrice: number;

  @Column()
  order_date: Date;

  @Column()
  delivery_date: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail[];


  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => PaymentMethod, (pm) => pm.order)
  paymentMethod: PaymentMethod;
}
