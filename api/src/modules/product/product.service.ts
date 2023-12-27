/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetListProductQuery } from './queries/get-list-product.query';
import { CreateProductCommand } from './commands/create-product.command';
import { ExcelService } from '../../shared/file-upload/excell/excel.service';
import { CreateProductFromFileCommand } from './commands/create-product-from-file.command';
import {
  ResponseBase,
  ResponseStatus,
} from '../../shared/payload/response-base';
import { ProductFromFileDto } from './dto/request/insert-product-list.dto';
import { UpdateProductCommand } from './commands/update-product.command';
import {
  GetProductByCategoryQuery,
  GetProductQuery,
} from './queries/get-product.query';
import { SearchProductQuery } from './queries/search-product.query';
import { Product } from '../../entities/product/product.entity';
import { FirebaseService } from 'src/shared/file-upload/firebase/firebase.service';
import { FilterProductOrderByPrice } from './queries/filter-product-orderBy';

@Injectable()
export class ProductService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly excelService: ExcelService,
    private readonly firebaseService: FirebaseService,
  ) {}
  private readonly logger = new Logger(ProductService.name);

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async filterProductByPrice(
    orderByName: string,
    category?: string,
  ): Promise<ResponseBase> {
    try {
      const products = await this.queryBus.execute(
        new FilterProductOrderByPrice(orderByName, category),
      );
      this.logger.debug(JSON.stringify(products));

      return new ResponseBase(
        ResponseStatus.Success,
        'Filter Successfully',
        products,
      );
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async createProduct(
    productData,
    thumbImage?: Express.Multer.File,
    detailImages?: Express.Multer.File[],
  ): Promise<ResponseBase> {
    try {
      this.logger.debug('product service');

      this.logger.debug(productData);
      let urlImageThumb;
      if (thumbImage) {
        (await this.firebaseService.uploadFile([thumbImage])).map(
          (imageUrl) => {
            urlImageThumb = imageUrl;
          },
        );
        this.logger.debug(thumbImage.originalname);
      }
      let productImageList = [];
      let descriptionImageLists;
      if (detailImages) {
        const imageList = await this.firebaseService.uploadFile(detailImages);
        productImageList = [...imageList];
        descriptionImageLists = JSON.stringify(productImageList);
      }
      const description = JSON.stringify(productData.description);
      const product = await this.commandBus.execute(
        new CreateProductCommand(
          productData,
          urlImageThumb,
          descriptionImageLists,
          description,
        ),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Create Product successfully',
        product,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getList(page: number, pagesize: number) {
    try {
      const product = await this.queryBus.execute(
        new GetListProductQuery(+page, +pagesize),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get Product List successfully',
        product,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async getProductByID(id: string): Promise<ResponseBase> {
    try {
      const product = await this.queryBus.execute(new GetProductQuery(id));
      if (!product) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Product not found',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Product retrieved successfully',
        product,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  getTopList(top: number) {
    ////return this.queryBus.execute(new GetTopListProductQuery(top));
  }

  async getProductByCategory(
    categoryName: string,
    page: number,
    pageSize: number,
  ) {
    // const getCategoryId = await this.queryBus.execute(new GetCategoryByName())
    try {
      const product = await this.queryBus.execute(
        new GetProductByCategoryQuery(categoryName, +page, +pageSize), //replace category = getCategoryId better
      );
      if (!product) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Product not found',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Product retrieved successfully',
        product,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async searchProduct(SearchProductDto, page, pagesize) {
    console.log(page);
    console.log(typeof page);
    if (SearchProductDto.name == '' && SearchProductDto.categoryId == '') {
      try {
        const product = await this.queryBus.execute(
          new GetListProductQuery(+page, +pagesize),
        );
        if (!product) {
          return this.createResponseBase(
            ResponseStatus.Failure,
            'Product List is Empty',
          );
        }
        return this.createResponseBase(
          ResponseStatus.Success,
          'Product retrieved successfully',
          product,
        );
      } catch (error) {
        return this.createResponseBase(ResponseStatus.Failure, error.message);
      }
    }
    try {
      const product = await this.queryBus.execute(
        new SearchProductQuery(
          SearchProductDto.name,
          SearchProductDto.categoryId,
          +page,
          +pagesize,
        ),
      );
      if (!product) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Provider not found',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Product retrieved successfully',
        product,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
  async createMany(excellFile: Express.Multer.File): Promise<ResponseBase> {
    const requiredColumns = [
      'id',
      'category',
      'type',
      'provider',
      'name',
      'price',
      'unit',
      'quantity',
      'quantityStock',
      'status',
      'description',
    ];

    const productsFromFile = await this.excelService
      .getDataObject(excellFile, requiredColumns)
      .catch((error: Error) => {
        throw new BadRequestException(
          new ResponseBase(ResponseStatus.Failure, error.message),
        );
      });

    const productToExecute = productsFromFile as ProductFromFileDto[];

    try {
      const commandResult = await this.commandBus.execute(
        new CreateProductFromFileCommand(productToExecute),
      );
      return new ResponseBase(
        ResponseStatus.Success,
        'Inserted',
        commandResult,
      );
    } catch (error) {
      throw new BadRequestException(
        new ResponseBase(ResponseStatus.Failure, error.message),
      );
    }
  }

  async updateProduct(
    productToUpdate: any,
    thumbImage?: Express.Multer.File,
    detailImages?: Express.Multer.File[],
  ): Promise<ResponseBase> {
    try {
      this.logger.debug(productToUpdate);
      const product: Product = JSON.parse(productToUpdate.product);
      if (thumbImage) {
        (await this.firebaseService.uploadFile([thumbImage])).map(
          (imageUrl) => {
            product.urlImageThumb = imageUrl;
          },
        );
        this.logger.debug(thumbImage.originalname);
      }
      let productImageList = [];
      if (detailImages) {
        const imageList = await this.firebaseService.uploadFile(detailImages);
        productImageList = [...imageList];
        product.descriptionImageLists = JSON.stringify(productImageList);
      }
      const commandResult = await this.commandBus.execute(
        new UpdateProductCommand(product),
      );
      return new ResponseBase(ResponseStatus.Success, 'Updated', commandResult);
    } catch (error) {
      this.logger.error(error);
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
