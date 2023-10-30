/* eslint-disable prettier/prettier */
import { OrderDetailRepository } from 'src/modules/order/repositories/order-detail.repository';
import { ExportDetailRepository } from './export-detail.repository';
import { ExportRepository } from './export.repository';
import { InventoryDetailRepository } from './inventory-detai.repository';
import { InventoryRepository } from './inventory.repository';
import { ReceiptDetailsRepository } from './receipt-detail.repository';
import { ReceiptRepository } from './receipt.repository';

export const InventoryRepositories = [
  ExportDetailRepository,
  ExportRepository,
  InventoryRepository,
  InventoryDetailRepository,
  ReceiptRepository,
  ReceiptDetailsRepository,
];
