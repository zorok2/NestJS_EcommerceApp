/* eslint-disable prettier/prettier */
import { Category } from '../../../entities/product/category.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryRepository } from '../repositories/category.repository';

export class CreateCategoryCommand {
  constructor(public readonly category: Category) {}
}
@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    return this.categoryRepository.create(command.category);
  }
}

export class UpdateCategoryCommand {
  constructor(public readonly category: Category) {}
}
@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(command: UpdateCategoryCommand): Promise<Category> {
    return this.categoryRepository.update(command.category);
  }
}
