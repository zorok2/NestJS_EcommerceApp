import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductFromFileDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ default: '6f811d87-8cd4-474a-ac1c-e903825e606b' })
  @IsNotEmpty()
  category: string;
  @ApiProperty({ default: 'b6753040-84f0-4eed-8fd6-cd01d834a7e4' })
  @IsNotEmpty()
  type: string;
  @ApiProperty({ default: '01c5f7a8-883f-4422-9b21-d0c06096f796' })
  @IsNotEmpty()
  provider: string;
  @ApiProperty({ default: 'name' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ default: 99 })
  @IsNotEmpty()
  price: number;
  @ApiProperty({ default: 99 })
  @IsNotEmpty()
  importPrice: number;
  @ApiProperty({ default: 'Đơn vị' })
  @IsNotEmpty()
  unit: string;
  @ApiProperty({ default: 10 })
  @IsNotEmpty()
  quantity: number;
  @ApiProperty({ default: 100 })
  @IsNotEmpty()
  quantityStock: number;
  @ApiProperty({ default: 'status' })
  @IsNotEmpty()
  status: string;
  @ApiProperty({ default: 'description' })
  @IsNotEmpty()
  description: string;
}
