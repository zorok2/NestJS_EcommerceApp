/* eslint-disable prettier/prettier */
import {
  GetExportDetailQueryHandler,
  GetExportDetailToPrintQueryHandler,
} from './export-detail.query';
import {
  GetListExportQueryHandler,
  GetExportByIdQueryHandler,
} from './export.query';

import { GetAllReceiptQueryHandler } from './get-all-receipt.query';
import { GetReceiptByIdQueryHandler } from './get-receipt-byId.query';
import { GetReceiptDetailByIdQueryHandler } from './get-receipt-detail-byId.query';
import { GetListInventoryQueryHandler } from './inventory.query';

export const InventoryQueries = [
  GetExportByIdQueryHandler,
  GetReceiptDetailByIdQueryHandler,
  GetAllReceiptQueryHandler,
  GetReceiptByIdQueryHandler,
  GetListExportQueryHandler,
  GetExportDetailQueryHandler,
  GetExportDetailToPrintQueryHandler,
  GetListInventoryQueryHandler,
];
