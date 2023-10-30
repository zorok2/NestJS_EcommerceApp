/* eslint-disable prettier/prettier */
import { RemoveCartCommand } from './../commands/remove-product-from-cart.command';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AddProductToCartDto,
  RemoveProductFromCartDto,
} from '../dto/add-product.dto';
import { AddProductToCartCommand } from '../commands/add-product-to-cart.command';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { RemoveProductFromCartCommand } from '../commands/remove-product-from-cart.command';
import { GetCartByUserIdQuery } from '../queries/get-cart-by-user-id.query';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  addProductToCart = async (
    addProductToCartDto: AddProductToCartDto,
    request: Request,
  ) => {
    const userId = request['userMetadata'].userId;
    Logger.log('UserID nè: ' + userId);
    try {
      const commandResult = await this.commandBus.execute(
        new AddProductToCartCommand(userId, addProductToCartDto),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Add products to cart success',
        commandResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  };

  // TODO: Call when enable order
  removeProductFromCart = async (
    removeProductFromCart: RemoveProductFromCartDto,
  ) => {
    try {
      const commandResult = await this.commandBus.execute(
        new RemoveCartCommand(
          removeProductFromCart,
        ),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Remove products to cart success',
        commandResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  };

  removeCart = async (removeProductFromCart: RemoveProductFromCartDto) => {
    try {
      const commandResult = await this.commandBus.execute(
        new RemoveProductFromCartCommand(
          removeProductFromCart.userId,
          removeProductFromCart,
        ),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Remove products to cart success',
        commandResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  };

  getAllProductFromCartByUserId = async (userId: string, request: Request) => {
    try {
      const queryResult = await this.queryBus.execute(
        new GetCartByUserIdQuery(userId),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Get cart success',
        queryResult,
      );
    } catch (error) {
      this.logger.error(error.message);
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  };
}
