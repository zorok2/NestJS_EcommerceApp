import { Inventory } from 'src/entities/inventory/inventory.entity';
import { CreateInventoryDto } from '../dto/request/create-inventory.dto';
import { uuid } from 'uuidv4';

export class InventoryModel {
  inventory: Inventory;
  constructor(createInventoryDto: CreateInventoryDto) {
    this.inventory = new Inventory();
    this.inventory.id = uuid();
    this.inventory.address = createInventoryDto.address;
    this.inventory.inventoryName = createInventoryDto.inventoryName;
  }

  setLocation(location: string) {
    this.inventory.location = location;
  }
  getInventoryEntity() {
    return this.inventory;
  }
}
