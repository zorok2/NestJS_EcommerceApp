/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateExportDto } from 'src/modules/inventory/dto/request/create-export.dto';
import { InventoryExportService } from 'src/modules/inventory/services/export.service';

export class CreateExportEvent {
  constructor(public readonly createExport: CreateExportDto) { }
}

@EventsHandler(CreateExportEvent)
export class CreateExportEventHandler
  implements IEventHandler<CreateExportEvent>
{
  private readonly logger = new Logger(CreateExportEventHandler.name);
  constructor(private readonly exportService: InventoryExportService) { }

  async handle(event: CreateExportEvent) {
    this.logger.log('event create export da chay');
    return await this.exportService.createExport(event.createExport);
  }
}
