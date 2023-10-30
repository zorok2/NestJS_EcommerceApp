import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty({ default: '6b6aa529-9871-4809-b5af-cf7f99c37abf' })
  idCategory: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '651d2d45-5b2e-4f1e-afad-486a05705e31' })
  idProductType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '5b737174-0340-4ee0-b5b4-c1c68db224c9' })
  idProvider: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Product name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Description' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 9.99 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 9.99 })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  @Column({ type: 'mediumblob' })
  urlImageThumb: File[];

  @IsNotEmpty()
  @ApiProperty()
  @Column({ type: 'mediumblob' })
  urlProductImage: File[];
}
