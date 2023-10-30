import {
  CreateCategoryCommandHandler,
  UpdateCategoryCommandHandler,
} from './category.command';
import { CreateProductFromFileCommandHandler } from './create-product-from-file.command';
import { CreateProductCommandHandler } from './create-product.command';
import { CreateProductTypeCommandHandler } from './create-productType.command';
import { DeleteProductTypeCommandHandler } from './delete-productType.command';
import { InsertProductListCommand } from './insert-product-list.command';
import {
  CreateProviderCommandHandler,
  UpdateProviderCommandHandler,
} from './provider.command';
import { UpdateProductCommandHandler } from './update-product.command';
import { UpdateProductTypeCommandHandler } from './update-productType.command';

export const ProductCommandHandlers = [
  CreateProductTypeCommandHandler,
  DeleteProductTypeCommandHandler,
  UpdateProductTypeCommandHandler,
  CreateProductCommandHandler,
  UpdateProductCommandHandler,
  InsertProductListCommand,
  CreateProductFromFileCommandHandler,
  CreateProviderCommandHandler,
  UpdateProviderCommandHandler,
  CreateCategoryCommandHandler,
  UpdateCategoryCommandHandler,
];
