/* eslint-disable prettier/prettier */
import { ExcelService } from 'src/shared/file-upload/excell/excel.service';
import { InventoryService } from './inventory.service';
import { ExportDetailService } from './export-detail.service';
import { InventoryExportService } from './export.service';
import { InventoryReceiptService } from './inventory-receipt.service';
import { WordService } from 'src/shared/file-upload/word/word.service';
import { ReceiptDetailService } from './receipt-detail.service';

export const InventoryServices = [
  InventoryService,
  ExcelService,
  InventoryReceiptService,
  ExportDetailService,
  InventoryExportService,
  InventoryReceiptService,
  WordService,
  ReceiptDetailService,
];
