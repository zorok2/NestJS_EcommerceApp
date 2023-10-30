/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../entities/product/product.entity';
import { FindOneOptions, ILike, Raw, Repository } from 'typeorm';
import * as unorm from 'unorm';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>, // @InjectRepository(ProductType) // productTypeRepository: Repository<ProductType>, // @InjectRepository(Category) categoryRepository: Repository<Category>, // @InjectRepository(Provider) providerRepository: Repository<Provider>,
  ) {}
  private readonly logger = new Logger(ProductRepository.name);
  // TODO Query
  GetListProductQuery(page: number, pageSize: number): Promise<Product[]> {
    return this.productRepository.find({
      relations: { category: true, provider: true, productType: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  getListProductOrderByPrice(orderByName?: string, category?: string) {
    if (orderByName == 'ASC') {
      if (category != null && category != '') {
        return this.productRepository.find({
          relations: { category: true, provider: true, productType: true },
          order: {
            price: 'ASC',
          },
          where: {
            category: {
              categoryName: category,
            },
          },
        });
      }
      return this.productRepository.find({
        relations: { category: true, provider: true, productType: true },
        order: {
          price: 'ASC',
        },
      });
    } else if (orderByName == 'DESC') {
      if (category != null && category != '') {
        return this.productRepository.find({
          relations: { category: true, provider: true, productType: true },
          order: {
            price: 'DESC',
          },
          where: {
            category: {
              categoryName: category,
            },
          },
        });
      }
      return this.productRepository.find({
        relations: { category: true, provider: true, productType: true },
        order: {
          price: 'DESC',
        },
      });
    } else if (orderByName == null || orderByName == '') {
      return this.productRepository.find({
        relations: { category: true, provider: true, productType: true },
        where: {
          category: {
            categoryName: category,
          },
        },
      });
    } else if (orderByName == 'Mặc định' && category == 'Mặc định') {
      return this.productRepository.find({
        relations: { category: true, provider: true, productType: true },
      });
    }
  }

  // getProductBySku(sku: string): Promise<Product> {
  //   const options: FindOneOptions<Product> = {
  //     where: {
  //       sku: sku,
  //     },
  //     relations: { category: true, provider: true, productType: true },
  //   };
  //   return this.productRepository.findOne(options);
  // }
  getProductId(id: string): Promise<Product> {
    const options: FindOneOptions<Product> = {
      where: {
        productId: id,
      },
      relations: { category: true, provider: true, productType: true },
    };
    return this.productRepository.findOne(options);
  }

  async getProductByName(
    name: string,
    categoryName: string,
    page: number,
    pageSize: number,
  ): Promise<any[]> {
    const normalizedKeyword = unorm.nfc(name).replace(/[\u0300-\u036f]/g, '');
    const products = await this.productRepository.find({
      relations: { category: true, provider: true, productType: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: [
        { productName: ILike(`%${normalizedKeyword}%`) },
        {
          productName: Raw(
            (alias) =>
              `unaccent(${alias}) ILIKE unaccent('%${normalizedKeyword}%')`,
          ),
        },
      ],
    });

    // const result1 = (await products).filter((product) =>
    //   product.productName.includes(name),
    // );
    return products;
  }

  async getProductByCategory(
    categoryName: string,
    page: number,
    pageSize: number,
  ): Promise<Product[]> {
    const products = await this.productRepository.find({
      // find with categoryId is better
      where: { category: { categoryName: categoryName } }, // replace column categoryName = categoryId better
      relations: ['category'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return products;
  }

  // TODO Command
  createProduct(product) {
    return this.productRepository.save(product);
  }

  insertProduct(product) {
    return this.productRepository.save(product);
  }

  updateProduct(product) {
    return this.productRepository.save(product);
  }

  async insertManyProduct(products: Product[]): Promise<void> {
    const queryBuilder = this.productRepository.createQueryBuilder();
    await queryBuilder.insert().into(Product).values(products).execute();
  }
}
