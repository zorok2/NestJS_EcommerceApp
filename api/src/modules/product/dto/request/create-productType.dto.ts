/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductTypeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '651d2d45-5b2e-4f1e-afad-486a05705e31' })
  productTypeId: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'ProductType Name' })
  productTypeName: string;
}
