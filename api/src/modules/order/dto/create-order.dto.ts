/* eslint-disable prettier/prettier */
import { Product } from 'src/entities/product/product.entity';
import { CreateDetailExportDto } from 'src/modules/inventory/dto/request/create-Detail-Export.dto';
import { CreateExportDto } from 'src/modules/inventory/dto/request/create-export.dto';

export class CreateOrderDto {
  userId: string;

  paymentMethodId: string;

  products: CreateDetailExportDto[];

  location: string;
}

export class UpdateStatusDto {
  orderId: string;

  status: string;
}
