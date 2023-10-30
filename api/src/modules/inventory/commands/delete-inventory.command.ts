import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';

export class DeleteInventoryCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteInventoryCommand)
export class DeleteInventoryCommandHandler
  implements ICommandHandler<DeleteInventoryCommand>
{
  private readonly logger = new Logger(DeleteInventoryCommandHandler.name);
  constructor(private readonly inventoryRepository: InventoryRepository) {}
  async execute(command: DeleteInventoryCommand): Promise<any> {
    return this.inventoryRepository.delete(command.id);
  }
}
