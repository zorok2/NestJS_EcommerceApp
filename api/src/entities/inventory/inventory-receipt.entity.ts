/* eslint-disable prettier/prettier */
import { Provider } from '../product/provider.entity';
import { Inventory } from './inventory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InventoryReceipt {
  @PrimaryGeneratedColumn('uuid')
  inventoryReceiptId: string;

  @ManyToOne(() => Provider, (provider) => provider)
  provider: Provider;

  @ManyToOne(() => Inventory, (inventory) => inventory.receipts)
  inventory: Inventory;

  @Column()
  userId: string;

  @Column()
  createdDate: Date;

  @Column()
  status: string;
}
