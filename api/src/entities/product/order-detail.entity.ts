/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  pricePurchase: number;

  @Column({ nullable: true, default: false })
  isReviewed: boolean;

  @ManyToOne(() => Product, (product) => product.orderDetail)
  product: Product;

  @ManyToOne(() => Order, (Order) => Order.orderDetail)
  order: Order;
}
