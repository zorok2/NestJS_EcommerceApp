/* eslint-disable prettier/prettier */
import { Product } from "src/entities/product/product.entity";
import { CreateDetailExportDto } from "src/modules/inventory/dto/request/create-Detail-Export.dto";

export class ProductInventoryDto {
    inventoryId: string;

    products: Array<CreateDetailExportDto>;
}