/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryExport } from './inventory-export.entity';
import { Product } from '../product/product.entity';
import { Provider } from '../product/provider.entity';
@Entity()
export class InventoryExportDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => InventoryExport,
    (inventoryExport) => inventoryExport.inventoryExportId,
  )
  inventoryExport: InventoryExport;

  @ManyToOne(() => Provider, (provider) => provider)
  provider: Provider;

  @ManyToOne(() => Product, (product) => product.productId)
  product: Product;

  @Column()
  unit: string;

  @Column()
  quantity: number;
}
