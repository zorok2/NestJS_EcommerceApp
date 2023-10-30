/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ default: '6f811d87-8cd4-474a-ac1c-e903825e606b' })
  @Column()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '651d2d45-5b2e-4f1e-afad-486a05705e31' })
  @Column()
  productTypeId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '5b737174-0340-4ee0-b5b4-c1c68db224c9' })
  @Column()
  providerId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'productName' })
  @Column()
  productName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Description' })
  @Column()
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 9 })
  @Column()
  price: number;

  @ApiProperty({ example: 9 })
  @Column()
  importPrice: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Đơn vị' })
  @Column()
  unit: string;

  @IsNotEmpty()
  @ApiProperty({ example: 9 })
  @Column()
  quantityStock: number;

  @ApiProperty()
  @Column({ type: 'mediumblob' })
  imageThumb: File[];

  @ApiProperty()
  @Column({ type: 'mediumblob' })
  productImage?: File[];
}

