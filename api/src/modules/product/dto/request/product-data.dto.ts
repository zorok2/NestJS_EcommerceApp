import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDataDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'jsonData' })
  productData: string;
}
