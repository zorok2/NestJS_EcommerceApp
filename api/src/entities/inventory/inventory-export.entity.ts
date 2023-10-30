/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity()
export class InventoryExport {
  @PrimaryGeneratedColumn('uuid')
  inventoryExportId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Inventory, (inventory) => inventory.exports)
  inventory: Inventory;

  @Column()
  createdDate: Date;
}
