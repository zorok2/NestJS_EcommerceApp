/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryReceipt } from './inventory-receipt.entity';
import { Product } from '../product/product.entity';

@Entity()
export class InventoryReceiptDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => InventoryReceipt,
    (inventoryReceipt) => inventoryReceipt.inventoryReceiptId,
  )
  inventoryReceipt: InventoryReceipt;

  @ManyToOne(() => Product, (_product) => _product)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  outDate: Date;
}
