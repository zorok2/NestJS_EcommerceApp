import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { UpdateProductDto } from '../dto/request/update-product.dto';

export class InsertProductListCommand {
  constructor(public readonly updateProductDto: UpdateProductDto) {}
}

@CommandHandler(InsertProductListCommand)
export class InsertProductListCommandHandler
  implements ICommandHandler<InsertProductListCommand>
{
  private readonly logger = new Logger(InsertProductListCommandHandler.name);

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: InsertProductListCommand) {
    this.logger.debug(`Create Product Command Handler`);

    // const productToUpdate: Product;
    // productToUpdate.update(command.updateProductDto);
    // Ger product
    // then then update
    // then store;

    return undefined;
  }
}
