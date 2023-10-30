import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProviderRepository } from '../../../product/repositories/provider.repository';
import { Provider } from '../../../../entities/product/provider.entity';

describe('ProviderRepository', () => {
  let providerRepository: ProviderRepository;
  let repository: Repository<Provider>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProviderRepository,
        {
          provide: 'ProviderRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    providerRepository = moduleRef.get<ProviderRepository>(ProviderRepository);
    repository = moduleRef.get('ProviderRepository');
  });

  describe('Create provider', () => {
    it('should return a inventory', async () => {
      const providerToCreate = new Provider();
      providerToCreate.id = uuidv4();
      providerToCreate.name = 'Some provider name';

      jest.spyOn(repository, 'save').mockResolvedValue(providerToCreate);

      const inventory = await providerRepository.create(providerToCreate);

      expect(inventory).toEqual(providerToCreate);
      expect(repository.save).toHaveBeenCalledWith(providerToCreate);
    });
  });
});
