/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  getRepository,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @ManyToOne(() => Product, (product) => product.review)
  product: Product;
}
