/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Order } from '../product/order.entity';
import { Cart } from '../product/cart.entity';
import { Review } from './review.entity';
// import { Review } from '../review/review.entity';
@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  name: string;

  @Column({
    default: false,
  })
  isAvailable: boolean;

  @OneToMany(() => User, (user) => user.permission)
  user: User[];
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  avatarUrl: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @ManyToOne(() => Permission, (permission) => permission.user)
  permission: Permission;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Review, (review) => review.user)
  review: Review[];
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  nameUserShipping: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true, default: false })
  isDefault: boolean;
}
