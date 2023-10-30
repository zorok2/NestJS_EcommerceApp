/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../entities/product/category.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(id: string): Promise<Category> {
    const options: FindOneOptions<Category> = {
      where: {
        categoryId: id,
      },
    };
    return this.categoryRepository.findOne(options);
  }

  async findByName(name: string): Promise<Category> {
    const options: FindOneOptions<Category> = {
      where: {
        categoryName: name,
      },
    };
    return this.categoryRepository.findOne(options);
  }

  async create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async deleteById(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
