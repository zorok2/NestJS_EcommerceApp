import { CreateExportCommandHandler } from './create-export.command';
import { CreateInventoryCommandHandler } from './create-inventory.command';
import { CreateReceiptFromFileCommandHandler } from './create-reciept-from-file.command';
import { DeleteInventoryCommandHandler } from './delete-inventory.command';

export const InventoryCommands = [
  CreateReceiptFromFileCommandHandler,
  CreateExportCommandHandler,
  CreateExportCommandHandler,
  CreateReceiptFromFileCommandHandler,
  CreateInventoryCommandHandler,
  DeleteInventoryCommandHandler,
];
