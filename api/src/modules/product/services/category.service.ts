import { Injectable } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { Category } from '../../../entities/product/category.entity';

import {
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from '../commands/category.command';
import {
  GetAllCategoryQuery,
  GetCategoryByIdQuery,
  GetCategoryByNameQuery,
} from '../queries/category.query';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';

@Injectable()
export class CategoryService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  private createResponseBase(
    status: ResponseStatus,
    message: string,
    data?: any,
  ): ResponseBase {
    return new ResponseBase(status, message, data);
  }

  async findAll(): Promise<ResponseBase> {
    const categories = await this.queryBus.execute(new GetAllCategoryQuery());
    return this.createResponseBase(
      ResponseStatus.Success,
      'Categories retrieved successfully',
      categories,
    );
  }

  async findById(id: string): Promise<ResponseBase> {
    try {
      const category = await this.queryBus.execute(
        new GetCategoryByIdQuery(id),
      );
      if (!category) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Category not found',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Category retrieved successfully',
        category,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async findByName(name: string): Promise<ResponseBase> {
    try {
      const category = await this.queryBus.execute(
        new GetCategoryByNameQuery(name),
      );
      if (!category) {
        return this.createResponseBase(
          ResponseStatus.Failure,
          'Category not found',
        );
      }
      return this.createResponseBase(
        ResponseStatus.Success,
        'Category retrieved successfully',
        category,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async create(category: Category): Promise<ResponseBase> {
    try {
      const createdCategory = await this.commandBus.execute(
        new CreateCategoryCommand(category),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Category created successfully',
        createdCategory,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }

  async update(category: Category): Promise<ResponseBase> {
    try {
      const updatedCategory = await this.commandBus.execute(
        new UpdateCategoryCommand(category),
      );
      return this.createResponseBase(
        ResponseStatus.Success,
        'Category updated successfully',
        updatedCategory,
      );
    } catch (error) {
      return this.createResponseBase(ResponseStatus.Failure, error.message);
    }
  }
}
