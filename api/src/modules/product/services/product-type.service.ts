/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Command } from 'ts-postgres/dist/src/protocol';
import { CreateProductTypeCommand } from '../commands/create-productType.command';
import {
  GetAllProductTypeByIdQuery,
  GetAllProductTypeQuery,
} from '../queries/get-all-productType.query';
import { UpdateProductCommand } from '../commands/update-product.command';
import { UpdateProductTypeCommand } from '../commands/update-productType.command';
import { DeleteProductTypeCommand } from '../commands/delete-productType.command';

@Injectable()
export class ProductTypeService {
  constructor(
    private readonly query: QueryBus,
    private readonly command: CommandBus,
  ) {}

  createProductType(productType): Promise<any> {
    return this.command.execute(new CreateProductTypeCommand(productType));
  }

  getProductTypes(): Promise<any[]> {
    return this.query.execute(new GetAllProductTypeQuery());
  }

  getProductTypeById(id): Promise<any> {
    return this.query.execute(new GetAllProductTypeByIdQuery(id));
  }

  updateProductType(productType) {
    return this.command.execute(new UpdateProductTypeCommand(productType));
  }

  async deleleProductType(id) {
    return await this.command.execute(new DeleteProductTypeCommand(id));
  }
}
