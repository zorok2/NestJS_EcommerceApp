import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ReceiptDetailService } from '../services/receipt-detail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Inventory Endpoint')
@Controller('/inventory/receipt-detail')
export class ReceiptDetailController {
  constructor(private readonly receiptService: ReceiptDetailService) {}
  private readonly logger = new Logger(ReceiptDetailController.name);

  @Get(':id')
  getReceiptDetail(@Param('id') id: string) {
    return this.receiptService.getReceiptDetailById(id);
  }
}
