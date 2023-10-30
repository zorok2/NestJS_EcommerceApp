/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryDetail } from '../../entities/inventory/inventory-detail.entity';
import { InventoryExportDetail } from '../../entities/inventory/inventory-export-detail.entity';
import { InventoryExport } from '../../entities/inventory/inventory-export.entity';
import { InventoryReceiptDetail } from '../../entities/inventory/inventory-receipt-detail.entity';
import { InventoryReceipt } from '../../entities/inventory/inventory-receipt.entity';
import { Inventory } from '../../entities/inventory/inventory.entity';
import { InventoryRepositories as InventoryRepositories } from './repositories';
import { InventoryCommands } from './commands';
import { InventoryControllers } from './controllers';
import { InventoryQueries } from './queries';
import { InventoryServices } from './services';
import { ProductModule } from '../product/product.module';
import { ProxyModule } from 'src/lib/proxy/proxy.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      Inventory,
      InventoryDetail,
      InventoryExport,
      InventoryReceipt,
      InventoryReceiptDetail,
      InventoryExportDetail,
    ]),
    forwardRef(() => ProductModule),
    ProxyModule,
  ],
  controllers: [...InventoryControllers],
  providers: [
    ...InventoryServices,
    ...InventoryRepositories,
    ...InventoryCommands,
    ...InventoryQueries,
  ],
  exports: [...InventoryServices, ...InventoryRepositories],
})
export class InventoryModule {}
