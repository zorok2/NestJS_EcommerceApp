/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Inventory } from './inventory.entity';
@Entity()
export class InventoryDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.productId)
  product: Product;

  @ManyToOne(() => Inventory, (inventory) => inventory.id)
  inventory: Inventory;

  @Column()
  quantity: number;

  @Column()
  status: string;
}
