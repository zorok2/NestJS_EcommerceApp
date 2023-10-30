/* eslint-disable prettier/prettier */
import {
  GetAllCategoryQueryQueryHandler,
  GetCategoryByIdQueryHandler,
  GetCategoryByNameQueryHandler,
} from './category.query';
import {
  FilterProductOrderByPrice,
  FilterProductOrderByPriceHandler,
} from './filter-product-orderBy';
import {
  GetAllProductTypeByIdQueryHandler,
  GetAllProductTypeQueryHandler,
} from './get-all-productType.query';
import { GetListProductQueryHandler } from './get-list-product.query';
import {
  GetProductByCategoryQueryHandler,
  GetProductQueryHandler,
} from './get-product.query';
import {
  GetListProviderQueryHandler,
  GetProviderByIdQueryHandler,
  GetProviderByNameQueryHandler,
} from './provider.query';
import { SearchProductQueryHandler } from './search-product.query';

export const ProductQueryHandlers = [
  GetAllProductTypeByIdQueryHandler,
  GetAllProductTypeQueryHandler,
  GetListProductQueryHandler,
  GetProductQueryHandler,
  SearchProductQueryHandler,
  GetProductByCategoryQueryHandler,
  GetListProviderQueryHandler,
  GetProviderByNameQueryHandler,
  GetProviderByIdQueryHandler,
  SearchProductQueryHandler,
  GetCategoryByNameQueryHandler,
  GetCategoryByIdQueryHandler,
  GetAllCategoryQueryQueryHandler,
  FilterProductOrderByPriceHandler,
];
