import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { InventoryModel } from '../models/inventory.model';

export class CreateInventoryCommand {
  constructor(public readonly inventoryModel: InventoryModel) {}
}

@CommandHandler(CreateInventoryCommand)
export class CreateInventoryCommandHandler
  implements ICommandHandler<CreateInventoryCommand>
{
  private readonly logger = new Logger(CreateInventoryCommandHandler.name);
  constructor(private readonly inventoryRepository: InventoryRepository) {}
  async execute(command: CreateInventoryCommand): Promise<any> {
    return this.inventoryRepository.create(
      command.inventoryModel.getInventoryEntity(),
    );
  }
}
