/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class ProductType {
  @PrimaryGeneratedColumn('uuid')
  productTypeId: string;

  @Column()
  productTypeName: string;

  @OneToMany(() => Product, (product) => product.productType)
  product: Product[];
}
