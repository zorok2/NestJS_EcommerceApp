/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDetailExportDto {
  @ApiProperty({ default: '01538b5d-2924-431c-80c0-fb8302fb1ea1' })
  @IsString()
  @IsNotEmpty()
  productId: string;
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  quantity: number;
}
