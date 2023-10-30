/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../../../entities/product/product.entity';
import { number } from 'joi';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';

export class UpdateProductCommand {
  constructor(public readonly data: Product) {}
}

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  private readonly logger = new Logger(UpdateProductCommandHandler.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: UpdateProductCommand) {
    this.logger.debug(`Update Product Command Handler`);
    const product = await this.productRepository.getProductId(
      command.data.productId,
    );
    let stock = product.quantityStock; // sl ton
    let amount = command.data.quantityStock; // sl sp can tru
    if (amount > stock) {
      return new ResponseBase(
        ResponseStatus.Failure,
        'The product out of stock',
      );
    }
    let total = stock - amount;
    command.data.quantityStock = total;
    this.logger.debug(`tổng tồn sau tính: ${total}`);

    return this.productRepository.updateProduct(command.data);
  }
}
