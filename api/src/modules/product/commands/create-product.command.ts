/* eslint-disable prettier/prettier */
import { CategoryRepository } from './../repositories/category.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductDto } from '../dto/request/create-product.dto';
import { Logger } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from 'src/entities/product/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { ProductTypeRepository } from '../repositories/product-type.repository';
import { ProviderRepository } from '../repositories/provider.repository';

export enum ProductStatus {
  Available,
  SoldOut,
  UnAvailable,
  Importing,
}

export class CreateProductCommand {
  constructor(
    public readonly productDto: CreateProductDto,
    public readonly urlImageThumb: any,
    public readonly descriptionImageLists: any,
    public readonly description: any,
  ) {}
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  private readonly logger = new Logger(CreateProductCommandHandler.name);

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly productTypeRepository: ProductTypeRepository,
    private readonly providerRepository: ProviderRepository,
  ) {}

  async execute(command: CreateProductCommand) {
    this.logger.debug(`Create Product Command Handler`);
    const productToSave: Product = new Product();
    productToSave.productId = uuidv4();
    productToSave.productName = command.productDto.productName;
    productToSave.description = command.description;
    productToSave.price = command.productDto.price;
    productToSave.status = 'Available';
    productToSave.unit = command.productDto.unit;
    productToSave.urlImageThumb = command.urlImageThumb;
    productToSave.descriptionImageLists = command.descriptionImageLists;
    productToSave.quantityStock = command.productDto.quantityStock;
    productToSave.createdDate = new Date();
    productToSave.updatedDay = new Date();
    productToSave.category = await this.categoryRepository.findById(
      command.productDto.categoryId,
    );
    productToSave.productType =
      await this.productTypeRepository.getProductTypeById(
        command.productDto.productTypeId,
      );
    productToSave.provider = await this.providerRepository.findById(
      command.productDto.providerId,
    );
    const result = await this.productRepository.createProduct(productToSave);
    // Publish Event: Log, Do something when create done;
    return result;
  }
}
