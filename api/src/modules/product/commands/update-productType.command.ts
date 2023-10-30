/* eslint-disable prettier/prettier */
import { OneToMany } from 'typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ProductTypeRepository } from '../repositories/product-type.repository';
import { ProductType } from 'src/entities/product/product-type.entity';
import { ProductTypeDto } from '../dto/request/create-productType.dto';
import { STATUS_CODES } from 'http';

export class UpdateProductTypeCommand implements ICommand {
  constructor(public readonly product: ProductTypeDto) {}
}

@CommandHandler(UpdateProductTypeCommand)
export class UpdateProductTypeCommandHandler
  implements ICommandHandler<UpdateProductTypeCommand>
{
  private readonly logger = new Logger(UpdateProductTypeCommandHandler.name);
  constructor(private productTypeRepo: ProductTypeRepository) {}

  execute(command: UpdateProductTypeCommand): Promise<any> {
    this.logger.debug('update product!');

    const productType: ProductType = new ProductType();
    productType.productTypeId = command.product.productTypeId;
    const product = this.productTypeRepo.getProductTypeById(
      command.product.productTypeId,
    );
    if (!product) {
      throw new HttpException(
        'Not found ProductId to update',
        HttpStatus.NOT_FOUND,
      );
    }
    productType.productTypeId = command.product.productTypeId;
    productType.productTypeName = command.product.productTypeName;
    return this.productTypeRepo.updateProductType(productType);
  }
}
