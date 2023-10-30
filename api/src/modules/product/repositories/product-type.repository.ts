/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ProductType } from '../../../entities/product/product-type.entity';

@Injectable()
export class ProductTypeRepository {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  async getProductTypes(): Promise<ProductType[]> {
    return this.productTypeRepository.find();
  }

  async getProductTypeById(id: string) {
    const options: FindOneOptions<ProductType> = {
      where: {
        productTypeId: id,
      },
    };
    return this.productTypeRepository.findOne(options);
  }

  async createProductType(productType: ProductType): Promise<ProductType> {
    return this.productTypeRepository.save(productType);
  }

  async updateProductType(productType: ProductType): Promise<ProductType> {
    const existingProductType = await this.getProductTypeById(
      productType.productTypeId,
    );

    existingProductType.productTypeName = productType.productTypeName;

    return this.productTypeRepository.save(existingProductType);
  }

  async findProductTypeByName(name: string): Promise<ProductType> {
    const options: FindOneOptions<ProductType> = {
      where: {
        productTypeName: name,
      },
    };
    return this.productTypeRepository.findOne(options);
  }

  async deleteProductType(id: string) {
    return this.productTypeRepository.delete(id);
  }
}
