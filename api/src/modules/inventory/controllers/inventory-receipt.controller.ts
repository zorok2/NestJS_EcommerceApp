import { InventoryReceiptService } from '../services/inventory-receipt.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ResponseBase } from 'src/shared/payload/response-base';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Inventory Endpoint')
@Controller('/inventory/receipt')
export class InventoryReceiptController {
  constructor(
    private readonly inventoryReceiptService: InventoryReceiptService,
  ) {}

  @Get()
  async getAll(): Promise<ResponseBase> {
    return this.inventoryReceiptService.getAllReceipt();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ResponseBase> {
    return this.inventoryReceiptService.getReceiptById(id);
  }

  @Get(':id')
  async generateReceipt(@Param('id') id: string) {
    return this.inventoryReceiptService.printReceipt(id);
  }
}
