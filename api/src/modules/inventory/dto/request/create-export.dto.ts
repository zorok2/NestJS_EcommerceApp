/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { Inventory } from 'src/entities/inventory/inventory.entity';
import { Product } from 'src/entities/product/product.entity';
import { CreateDetailExportDto } from './create-Detail-Export.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExportDto {
  inventoryExportId?: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'John Doe' })
  @IsString()
  userId: string;

  @IsNotEmpty()
  inventoryId: string;

  createdDate: Date;

  // cho chi tiết export
  products: CreateDetailExportDto[];
}
