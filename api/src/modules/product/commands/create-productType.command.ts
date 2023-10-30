/* eslint-disable prettier/prettier */
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductTypeRepository } from '../repositories/product-type.repository';
import { ProductType } from 'src/entities/product/product-type.entity';
import { ProductTypeDto } from '../dto/request/create-productType.dto';
import { v3, v4 } from 'uuid';

export class CreateProductTypeCommand implements ICommand {
  constructor(public readonly productType: ProductTypeDto) {}
}

@CommandHandler(CreateProductTypeCommand)
export class CreateProductTypeCommandHandler
  implements ICommandHandler<CreateProductTypeCommand>
{
  private readonly logger = new Logger(CreateProductTypeCommandHandler.name);
  constructor(private productTypeRepo: ProductTypeRepository) {}

  execute(command: CreateProductTypeCommand): Promise<any> {
    const productType: ProductType = new ProductType();
    productType.productTypeId = v4();
    productType.productTypeName = command.productType.productTypeName;
    return this.productTypeRepo.createProductType(productType);
  }
}
