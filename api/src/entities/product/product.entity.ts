/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductType } from './product-type.entity';
import { Provider } from './provider.entity';
import { Order } from './order.entity';
import { OrderDetail } from './order-detail.entity';
import { Cart } from './cart.entity';
import { Review } from '../user/review.entity';
// import { Review } from '../review/review.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column()
  productName: string;

  @Column('jsonb')
  description: string;

  @Column()
  price: number;

  @Column()
  status: string;

  @Column()
  unit: string;

  @Column({
    nullable: true,
  })
  urlImageThumb: string;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  descriptionImageLists: string;

  @Column()
  quantityStock: number;

  @Column()
  createdDate: Date;

  @Column()
  updatedDay: Date;

  @Column({
    nullable: true,
    default: 5,
  })
  rating: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail[];

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ManyToOne(() => ProductType, (productType) => productType.product)
  productType: ProductType;

  @ManyToOne(() => Provider, (provider) => provider.product)
  provider: Provider;

  @OneToMany(() => Cart, (Cart) => Cart)
  cart: Cart[];

  @OneToMany(() => Review, (review) => review.product)
  review: Review[];

  productToSave: Promise<Category>;
}
