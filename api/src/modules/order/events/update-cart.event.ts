import { Logger } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RemoveProductFromCartCommand } from 'src/modules/cart/commands/remove-product-from-cart.command';
import { RemoveProductFromCartDto } from 'src/modules/cart/dto/add-product.dto';
import { CreateExportDto } from 'src/modules/inventory/dto/request/create-export.dto';
import { InventoryExportService } from 'src/modules/inventory/services/export.service';

export class UpdateCartEvent {
  constructor(
    public readonly userId: string,
    public readonly products: RemoveProductFromCartDto,
  ) { }
}

@EventsHandler(UpdateCartEvent)
export class UpdateCartEventHandler implements IEventHandler<UpdateCartEvent> {
  private readonly logger = new Logger(UpdateCartEventHandler.name);
  constructor(
    private readonly exportService: InventoryExportService,
    private readonly commandbus: CommandBus,
  ) { }

  async handle(event: UpdateCartEvent) {
    this.logger.log('event update CART da chay');
    this.commandbus.execute(
      new RemoveProductFromCartCommand(event.userId, event.products),
    );
    // return await this.exportService.createExport(event.createExport);
  }
}
