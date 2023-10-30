import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateDetailExportDto } from 'src/modules/inventory/dto/request/create-Detail-Export.dto';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';

export class UpdateQuantityStockEvent {
  constructor(public readonly products: CreateDetailExportDto[]) { }
}

@EventsHandler(UpdateQuantityStockEvent)
export class UpdateQuantityStockEventHandler
  implements IEventHandler<UpdateQuantityStockEvent>
{
  private readonly logger = new Logger(UpdateQuantityStockEventHandler.name);

  constructor(private readonly productRepo: ProductRepository) { }
  async handle(event: UpdateQuantityStockEvent) {
    this.logger.log('UPDATE QUANTITY STOCK');

    for (const product of event.products) {
      //   try {
      const item = await this.productRepo.getProductId(product.productId);

      const stockQuantity = item.quantityStock; // tồn dưới db
      this.logger.log('het hang ? ' + (product.quantity > stockQuantity));

      if (product.quantity > stockQuantity) {
        return new HttpException(
          `The product ${item.productId} is out of stock`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        await this.productRepo.updateProduct(item);
        this.logger.debug('DA DUOC update' + item.quantityStock);
      }
    }
  }
}
