/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';
import { ProductCommandHandlers } from './commands';
import { ProductQueryHandlers } from './queries';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../.././entities/product/category.entity';
import { ProductType } from '../.././entities/product/product-type.entity';
import { Product } from '../.././entities/product/product.entity';
import { Provider } from '../.././entities/product/provider.entity';
import { ProductModel } from './models/product.model';
import { FirebaseService } from 'src/shared/file-upload/firebase/firebase.service';
import { CategoryRepository } from './repositories/category.repository';
import { ProviderRepository } from './repositories/provider.repository';
import { ProductTypeRepository } from './repositories/product-type.repository';
import { ProviderService } from './services/provider.service';
import { ProviderController } from './controllers/provider.controller';
import { ProviderModel } from './models/provider.model';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { ProductTypeService } from './services/product-type.service';
import { ProductTypeController } from './controllers/product.type.controller';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product, Category, ProductType, Provider]),
    UserModule,
    SharedModule,
  ],
  controllers: [
    ProductController,
    ProviderController,
    CategoryController,
    ProductTypeController,
  ],
  providers: [
    ProductService,
    ProductTypeService,
    ProductRepository,
    ProductModel,
    ProductTypeRepository,
    CategoryRepository,
    ProviderRepository,
    CategoryService,
    ProductModel,
    ProviderService,
    CategoryRepository,
    ProviderRepository,
    ProviderModel,
    ...ProductCommandHandlers,
    ...ProductQueryHandlers,
  ],
  exports: [
    ProductService,
    ProviderService,
    ProductRepository,
    ProviderRepository,
  ],
})
export class ProductModule {}
