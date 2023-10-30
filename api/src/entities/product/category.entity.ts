/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column({
    unique: true,
  })
  @Column()
  categoryName: string;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
