/* eslint-disable prettier/prettier */
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { AddressRepository } from './address.repository';
import { PermissionRepository } from './permission.repository';
import { ReviewRepository } from './review.repository';
import { UserRepository } from './user.repository';

export const UserRepositories = [
  UserRepository,
  PermissionRepository,
  AddressRepository,
  ReviewRepository,
];
