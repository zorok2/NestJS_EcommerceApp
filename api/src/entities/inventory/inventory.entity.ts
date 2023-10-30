/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryReceipt } from './inventory-receipt.entity';
import { InventoryExport } from './inventory-export.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  inventoryName: string;

  @Column()
  address: string;

  @Column()
  location: string;

  @OneToMany(() => InventoryReceipt, (receipt) => receipt.inventory)
  receipts: InventoryReceipt[];

  @OneToMany(() => InventoryExport, (_export) => _export.inventory)
  exports: InventoryExport[];
}
