/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CartService } from './services/cart.service';
import {
  AddProductToCartDto,
  RemoveProductFromCartDto,
} from './dto/add-product.dto';
import { ResponseBase } from 'src/shared/payload/response-base';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: `Get all product in cart`,
  })
  @Get(':id')
  async getCartByUserId(
    @Param('id') id: string,
    @Req() request,
  ): Promise<ResponseBase> {
    return this.cartService.getAllProductFromCartByUserId(id, request);
  }

  @Post()
  async addProductToCart(
    @Body() addProductToCartDto: AddProductToCartDto,
    @Req() request,
  ): Promise<ResponseBase> {
    Logger.debug('REQUEST USER ' + request['userMetadata'].userId);
    // Logger.debug(' USER ' + request.userId);

    return this.cartService.addProductToCart(addProductToCartDto, request);
  }

  @ApiOperation({
    summary: `Use both user remove product from cart and make order`,
  })
  @Delete()
  async removeProductFromCart(
    @Body() removeProductFromCartDto: RemoveProductFromCartDto,
  ): Promise<ResponseBase> {
    return this.cartService.removeProductFromCart(
      removeProductFromCartDto,
    );
  }

  @ApiOperation({
    summary: `Use both user remove product from cart and make order`,
  })
  @Delete()
  async removeCart(
    @Body() removeProductFromCartDto: RemoveProductFromCartDto,
  ): Promise<ResponseBase> {
    return this.cartService.removeCart(
      removeProductFromCartDto,
    );
  }
}
