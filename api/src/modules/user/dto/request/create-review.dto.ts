import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  comment: string;

  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsString()
  orderId: string;
}
