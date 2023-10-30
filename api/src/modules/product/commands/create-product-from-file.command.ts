/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { ProductFromFileDto } from '../dto/request/insert-product-list.dto';
import { ProductTypeRepository } from '../repositories/product-type.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { ProviderRepository } from '../repositories/provider.repository';
import { ProductType } from '../../../entities/product/product-type.entity';
import { Category } from '../../../entities/product/category.entity';
import { Provider } from '../../../entities/product/provider.entity';
import { Product } from '../../../entities/product/product.entity';
import { EntityManager } from 'typeorm';

export class CreateProductFromFileCommand {
  constructor(public readonly products: ProductFromFileDto[]) {}
  productFromFileDtoTransformToProduct = (
    productType: ProductType,
    category: Category,
    provider: Provider,
    createdDate: Date,
    urlImageThumb: string,
    descriptionImageLists: string,
    productFromFileDto: ProductFromFileDto,
  ): Product => {
    const product: Product = new Product();
    product.productId = productFromFileDto.id;

    product.productType = productType;
    product.category = category;
    product.provider = provider;

    product.description = productFromFileDto.description;
    product.productName = productFromFileDto.name;
    product.price = productFromFileDto.price;
    product.quantityStock = productFromFileDto.quantityStock;
    product.unit = productFromFileDto.unit;

    product.status = productFromFileDto.status;
    product.urlImageThumb = urlImageThumb;
    product.descriptionImageLists = descriptionImageLists;
    product.updatedDay = new Date();
    product.createdDate = createdDate;
    return product;
  };
}

@CommandHandler(CreateProductFromFileCommand)
export class CreateProductFromFileCommandHandler
  implements ICommandHandler<CreateProductFromFileCommand>
{
  private readonly logger = new Logger(
    CreateProductFromFileCommandHandler.name,
  );

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productTypeRepository: ProductTypeRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly providerRepository: ProviderRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async execute(command: CreateProductFromFileCommand): Promise<Product[]> {
    const productWaitToSave: Product[] = [];
    await Promise.allSettled(
      command.products.map(
        async ({ id, category, provider, type, ...rest }) => {
          try {
            const productSaved = await this.productRepository.getProductId(id);

            let categorySaved = await this.categoryRepository.findByName(
              category,
            );
            if (!categorySaved) {
              const categoryToSave = new Category();
              categoryToSave.categoryName = category;
              categorySaved = await this.categoryRepository.create(
                categoryToSave,
              );
            }

            let providerSaved = await this.providerRepository.findOneByName(
              provider,
            );
            if (!providerSaved) {
              const providerToSave = new Provider();
              providerToSave.id = provider;
              providerSaved = await this.providerRepository.create(
                providerToSave,
              );
            }

            let productTypeStored =
              await this.productTypeRepository.findProductTypeByName(type);

            if (!productTypeStored) {
              const productTypeObj = new ProductType();
              productTypeObj.productTypeName = type;
              productTypeStored =
                await this.productTypeRepository.createProductType(
                  productTypeObj,
                );
            }

            const productTosave = command.productFromFileDtoTransformToProduct(
              productTypeStored,
              categorySaved,
              providerSaved,
              productSaved ? productSaved.createdDate : new Date(),
              productSaved ? productSaved.urlImageThumb : '',
              productSaved ? productSaved.descriptionImageLists : '',
              { id, category, provider, type, ...rest },
            );

            productWaitToSave.push(productTosave);
          } catch (error) {
            return Promise.reject(new Error(error));
          }
        },
      ),
    );
    try {
      const savedProducts = await this.entityManager.save(
        Product,
        productWaitToSave,
      );
      this.logger.log('Insert products success');
      return Promise.resolve(savedProducts);
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  }
}
