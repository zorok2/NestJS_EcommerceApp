/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Min } from 'class-validator';
export class AddProductRequest {
  @IsUUID('4', { message: 'Invalid productId format' })
  @ApiProperty({ example: '71969137-6fcd-4ba5-af90-0da3d9726c2c' })
  productId: string;

  @Min(1, { message: 'Quantity must be greater than 0' })
  @ApiProperty({ example: '9' })
  quantity: number;
}
export class AddProductToCartDto {
  @IsNotEmpty({
    message: 'UserId id required!',
  })
  userId: string;
  @IsNotEmpty({
    message: 'List product id required!',
  })
  @ApiProperty({
    example:
      '[{"productId":"71969137-6fcd-4ba5-af90-0da3d9726c2c",   "quantity": "10"}]',
  })
  products: AddProductRequest[];
}

export class RemoveProductFromCartDto {
  @IsNotEmpty({
    message: 'List product id required!',
  })
  @ApiProperty({
    example:
      '[{"productId":"71969137-6fcd-4ba5-af90-0da3d9726c2c",   "quantity": "10"}]',
  })
  products: AddProductRequest[];

  @IsUUID('4', { message: 'Invalid UserId format' })
  @ApiProperty({ example: '71969137-6fcd-4ba5-af90-0da3d9726c2c' })
  userId: string;
}
