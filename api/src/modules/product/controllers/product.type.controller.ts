/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductTypeService } from '../services/product-type.service';
import { ProductTypeDto } from '../dto/request/create-productType.dto';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('ProductType Endpoint')
@Controller('productType')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  create(@Body() productTypeName: string) {
    return this.productTypeService.createProductType(productTypeName);
  }

  @Get()
  async getProductTypes(@Query('id') id?: string) {
    if (!id) {
      return this.productTypeService.getProductTypes();
    }
    try {
      const productType = await this.productTypeService.getProductTypeById(id);
      if (!productType) {
        return new ResponseBase(ResponseStatus.Failure, 'ID not found');
      }
      return new ResponseBase(
        ResponseStatus.Success,
        'Get successful',
        productType,
      );
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  @Put()
  async update(@Body() productType: ProductTypeDto) {
    try {
      const pd = await this.productTypeService.getProductTypeById(
        productType.productTypeId,
      );
      if (!pd) {
        return new ResponseBase(ResponseStatus.Failure, 'ID not found');
      }
      return new ResponseBase(ResponseStatus.Success, 'Get successful', pd);
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const pd = await this.productTypeService.getProductTypeById(id);
      if (!pd) {
        return new ResponseBase(ResponseStatus.Failure, 'ID not found');
      }
      return new ResponseBase(ResponseStatus.Success, 'Get successful', pd);
    } catch (error) {
      return new ResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
