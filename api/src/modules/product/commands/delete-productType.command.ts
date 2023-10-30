import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProductTypeRepository } from '../repositories/product-type.repository';
import { ProductType } from 'src/entities/product/product-type.entity';
import { ProductTypeDto } from '../dto/request/create-productType.dto';
import { uuid } from 'uuidv4';

export class DeleteProductTypeCommand implements ICommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteProductTypeCommand)
export class DeleteProductTypeCommandHandler
  implements ICommandHandler<DeleteProductTypeCommand>
{
  private readonly logger = new Logger(DeleteProductTypeCommandHandler.name);
  constructor(private productTypeRepo: ProductTypeRepository) {}
  async execute(command: DeleteProductTypeCommand): Promise<any> {
    this.logger.debug('delete product!');
    return this.productTypeRepo.deleteProductType(command.id);
  }
}
