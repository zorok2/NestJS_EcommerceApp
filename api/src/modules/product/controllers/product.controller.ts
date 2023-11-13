/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Put,
  ValidationPipe,
  BadRequestException,
  Logger,
  HttpCode,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/request/create-product.dto';
import { SearchProductDto } from '../dto/request/search-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ResponseBase } from 'src/shared/payload/response-base';
import { ApiTags } from '@nestjs/swagger';
import { ProductDataDto } from '../dto/request/product-data.dto';

@ApiTags('Product Endpoint')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  private readonly logger = new Logger(ProductController.name);

  //TODO Query
  //Get Product List
  @Get()
  async getProducts(
    @Query('pageSize') pageSize: number,
    @Query('page') page: number,
  ) {
    const product = await this.productService.getList(+page, +pageSize);
    return product;
  }

  //Get Product By Category
  @Get('category/:categoryName')
  async getProductByCategory(
    @Param('categoryName') categoryName: string,
    @Query('pageSize') pageSize: number,
    @Query('page') page: number,
  ) {
    const product = await this.productService.getProductByCategory(
      categoryName,
      +page,
      +pageSize,
    );
    return product;
  }

  //filter product by price, truyền vo ASC, DESC
  @Get('filter')
  async filterPrice(
    @Query('orderBy') orderBy: string,
    @Query('category') category?: string,
  ) {
    return this.productService.filterProductByPrice(orderBy, category);
  }

  //Search Product By Name
  @Get('search')
  async search(
    @Query(new ValidationPipe({ transform: true }))
    searchQuery: SearchProductDto,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const result = await this.productService.searchProduct(
      searchQuery,
      +page,
      +pageSize,
    );
    return result;
  }

  //Get Top Product
  // @Get('/:top')
  // async getTopProduct(@Param('top') top: number) {
  //   const product = await this.productService.getTopList(top);
  //   return { id: 2, name: 'nghia' };
  // }

  //Get Product By Id
  @Get(':id')
  async getProductByID(@Param('id') id: string): Promise<ResponseBase> {
    const product = await this.productService.getProductByID(id);
    return product;
  }

  //Create Product
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'product', maxCount: 4 },
    ]),
  )
  async createProduct(
    @UploadedFiles() file: { image?: Express.Multer.File },
    @UploadedFiles() files: { product?: Express.Multer.File[] },
    @Body() productData: CreateProductDto,
  ) {
    const thumbImageToStore = file?.image?.[0];
    const detailImagesToStore = files?.product;
    const product = await this.productService.createProduct(
      productData,
      thumbImageToStore,
      detailImagesToStore,
    );
    return product;
  }

  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbImage', maxCount: 1 },
      { name: 'detailImages', maxCount: 5 },
    ]),
  )
  async updateProduct(
    @Body() productData: ProductDataDto,
    @UploadedFiles() thumbImage: { thumbImage?: Express.Multer.File },
    @UploadedFiles() detailImages: { detailImages?: Express.Multer.File[] },
  ) {
    const thumbImageToStore = thumbImage?.thumbImage?.[0];
    const detailImagesToStore = detailImages?.detailImages;
    const productUpdated = await this.productService.updateProduct(
      productData.productData,
      thumbImageToStore,
      detailImagesToStore,
    );
    return productUpdated;
  }

  @Post('/excel')
  @HttpCode(201)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  async uploadProductFromExcel(
    @UploadedFiles() excelFile: { file?: Express.Multer.File },
  ) {
    const excelFileToStore = excelFile?.file?.[0];
    if (!excelFileToStore) {
      throw new BadRequestException('Excel file is missing');
    }
    const maxSize = 1024 * 1024 * 10; // 10 MB
    if (excelFileToStore.size > maxSize) {
      throw new BadRequestException(
        `Excel file size must not exceed ${maxSize / 1024 / 1024} MB`,
      );
    }
    return this.productService.createMany(excelFileToStore);
  }
}
