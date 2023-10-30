import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { InventoryService } from '../services/inventory.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateInventoryDto } from '../dto/request/create-inventory.dto';
@ApiTags('Inventory Endpoint')
@Controller('/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }
  private readonly logger = new Logger(InventoryController.name);

  @Post('/excel')
  @HttpCode(201)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  async uploadProductFromExcel(
    @UploadedFiles() excelFile: { file?: Express.Multer.File },
    @Body() receipt: any,
  ) {
    const excelFileProducts = excelFile?.file?.[0];
    if (!excelFileProducts) {
      throw new BadRequestException('Excel file is missing');
    }
    const maxSize = 1024 * 1024 * 10; // 10 MB
    if (excelFileProducts.size > maxSize) {
      throw new BadRequestException(
        `Excel file size must not exceed ${maxSize / 1024 / 1024} MB`,
      );
    }
    return this.inventoryService.createReceipt(excelFileProducts, receipt);
  }

  @Post()
  @HttpCode(201)
  createInventorry(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Get()
  @HttpCode(200)
  getAllInventory() {
    return this.inventoryService.getList();
  }

  @Delete(':id')
  async removeInventory(@Param('id') id: string) {
    return await this.inventoryService.removeInventory(id);
  }
}
