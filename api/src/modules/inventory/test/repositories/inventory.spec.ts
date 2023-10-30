import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { InventoryRepository } from '../../repositories/inventory.repository';
import { Inventory } from '../../../../entities/inventory/inventory.entity';
import { v4 as uuidv4 } from 'uuid';

describe('InventoryRepository', () => {
  let inventoryRepository: InventoryRepository;
  let repository: Repository<Inventory>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InventoryRepository,
        {
          provide: 'InventoryRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    inventoryRepository =
      moduleRef.get<InventoryRepository>(InventoryRepository);
    repository = moduleRef.get('InventoryRepository');
  });

  describe('Create inventory', () => {
    it('should return a inventory', async () => {
      const inventoryToCreate = new Inventory();
      inventoryToCreate.address = 'Some address';
      inventoryToCreate.id = uuidv4();
      inventoryToCreate.name = 'Some name';

      jest.spyOn(repository, 'save').mockResolvedValue(inventoryToCreate);

      const inventory = await inventoryRepository.create(inventoryToCreate);

      expect(inventory).toEqual(inventoryToCreate);
      expect(repository.save).toHaveBeenCalledWith(inventoryToCreate);
    });
  });
});
