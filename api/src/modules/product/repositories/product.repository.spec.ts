/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ProductRepository } from './product.repository';
import { Product } from '../../../entities/product/product.entity';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: 'ProductRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    productRepository = moduleRef.get<ProductRepository>(ProductRepository);
    repository = moduleRef.get('ProductRepository');
  });

  describe('GetListProductQuery', () => {
    it('should return an array of products', async () => {
      const expectedProducts = [new Product(), new Product()];
      jest.spyOn(repository, 'find').mockResolvedValue(expectedProducts);

      const products = await productRepository.GetListProductQuery();

      expect(products).toEqual(expectedProducts);
    });
  });

  describe('getProductId', () => {
    it('should return a product by ID', async () => {
      const expectedProduct = new Product();
      const id = '1';
      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedProduct);

      const product = await productRepository.getProductId(id);

      expect(product).toEqual(expectedProduct);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const expectedProduct = new Product();
      jest.spyOn(repository, 'save').mockResolvedValue(expectedProduct);

      const product = await productRepository.createProduct(expectedProduct);

      expect(product).toEqual(expectedProduct);
      expect(repository.save).toHaveBeenCalledWith(expectedProduct);
    });
  });

  describe('insertProduct', () => {
    it('should insert and return a new product', async () => {
      const expectedProduct = new Product();
      jest.spyOn(repository, 'save').mockResolvedValue(expectedProduct);

      const product = await productRepository.insertProduct(expectedProduct);

      expect(product).toEqual(expectedProduct);
      expect(repository.save).toHaveBeenCalledWith(expectedProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update and return an existing product', async () => {
      const expectedProduct = new Product();
      jest.spyOn(repository, 'save').mockResolvedValue(expectedProduct);

      const product = await productRepository.updateProduct(expectedProduct);

      expect(product).toEqual(expectedProduct);
      expect(repository.save).toHaveBeenCalledWith(expectedProduct);
    });
  });
});
